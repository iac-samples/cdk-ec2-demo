# Welcome to your CDK EC2 Demo TypeScript project!

This project deploys an EC2 instance the the VPC created by the project [CDK VPC Smaple](https://github.com/iac-samples/cdk-vpc-demo)

Before deploy this project, user need to check the cdk context to validate the cached values in the context. 

If the cached VPC Id in the SSM or the inforamtion in the vpc-provider are not accurate, you need to remove those keys by using the command: `cdk context --reset KEY_OR_NUMBER`

#### How to deploy this project
1. Deploy the [CDK VPC Sample](https://github.com/iac-samples/cdk-vpc-demo)
2. Deploy this project afte checking the context.

---

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
