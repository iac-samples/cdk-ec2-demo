#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEc2DemoStack } from '../lib/cdk-ec2-demo-stack';

const app = new cdk.App();
new CdkEc2DemoStack(app, 'CdkEc2DemoStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});