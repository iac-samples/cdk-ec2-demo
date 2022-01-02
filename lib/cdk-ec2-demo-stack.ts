import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as iam from "@aws-cdk/aws-iam";
import * as ssm from "@aws-cdk/aws-ssm";

export class CdkEc2DemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/VpcProvider/VPCID');

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcId: vpcId,
    });

    //Allow SSH access form any where
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });

    //Allow SSH access from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));

    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    //Select AMI image
    const ami = ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      virtualization: ec2.AmazonLinuxVirt.HVM,
      storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
    });

    //Create EC2 instance
    const instance = new ec2.Instance(this, 'Instance', {
      instanceName: 'cdk-ec2-demo',
      vpc,
      machineImage: ami,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      role,
      securityGroup,
      keyName: 'cdk-ec2-demo',
    });

  }
}
