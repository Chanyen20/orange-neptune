#!/usr/bin/env bash
# One-time bootstrap: creates the IAM role and the Lambda function.
# Run this ONCE. After that, use `npm run deploy` to push code updates.
#
#   cd infra/contact-lambda
#   CONTACT_TO_ADDRESS=hello@orangeneptune.com \
#   CONTACT_FROM_ADDRESS=no-reply@orangeneptune.com \
#   ALLOW_ORIGIN=https://orangeneptune.com \
#   ./create.sh
set -euo pipefail

FUNCTION_NAME="${FUNCTION_NAME:-orange-neptune-contact}"
ROLE_NAME="${ROLE_NAME:-orange-neptune-contact-role}"
REGION="${AWS_REGION:-ap-northeast-1}"

# Required — where leads land and who they're sent from (must be SES-verified).
: "${CONTACT_TO_ADDRESS:?set CONTACT_TO_ADDRESS, e.g. hello@orangeneptune.com}"
: "${CONTACT_FROM_ADDRESS:?set CONTACT_FROM_ADDRESS, e.g. no-reply@orangeneptune.com (must be SES-verified)}"
ALLOW_ORIGIN="${ALLOW_ORIGIN:-*}"
# SES region — defaults to the Lambda region. Override only if your verified
# sender lives in a different region than the function.
SES_REGION="${SES_REGION:-$REGION}"

echo "==> Creating IAM role: $ROLE_NAME"
aws iam create-role \
  --role-name "$ROLE_NAME" \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }]
  }' >/dev/null 2>&1 || echo "    (role already exists, continuing)"

echo "==> Attaching basic logging policy"
aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

echo "==> Attaching inline SES send policy"
aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name ses-send \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{ "Effect": "Allow", "Action": "ses:SendEmail", "Resource": "*" }]
  }'

ROLE_ARN="$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text)"
echo "    Role ARN: $ROLE_ARN"

echo "==> Packaging code"
npm install --silent
npm run --silent package

echo "==> Waiting for IAM role to propagate (10s)"
sleep 10

echo "==> Creating Lambda function: $FUNCTION_NAME"
aws lambda create-function \
  --region "$REGION" \
  --function-name "$FUNCTION_NAME" \
  --runtime nodejs20.x \
  --handler index.handler \
  --timeout 10 \
  --zip-file fileb://function.zip \
  --role "$ROLE_ARN" \
  --environment "Variables={CONTACT_TO_ADDRESS=$CONTACT_TO_ADDRESS,CONTACT_FROM_ADDRESS=$CONTACT_FROM_ADDRESS,ALLOW_ORIGIN=$ALLOW_ORIGIN,SES_REGION=$SES_REGION}"

echo
echo "✅ Lambda created. Next: wire up API Gateway (POST /api/contact) and the CloudFront /api/* behaviour — see README.md."
echo "   From now on, deploy code changes with:  npm run deploy"
