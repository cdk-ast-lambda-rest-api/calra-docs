---
sidebar_label: "Resource Builder"
sidebar_position: 2
description: "Builder instance"
---

# Class Resource Builder

## ResourceBuilder Constructor

description

Parameters:

- example (Optional[]):

# Methods

## Defaults

The ResourceBuilder instance is able to set default options for numerous Lambda Function's parameters (And only one value per category). This default options will be assigned to each function created through your Builder and can only be overridden on a case to casis basis using [Lambda Decorators](/docs/category/lambda-package).

### set_default_memory_size

The first option you can set as default is Memory Size.

:::info

From **AWS CDK** official [documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html).

The amount of memory, in MB, that is allocated to your Lambda function. Lambda uses this value to proportionally allocate the amount of CPU power. For more information, see Resource Model in the AWS Lambda Developer Guide. Default: 128
:::

Parameters:

- memory_size (int):

### set_default_role

Roles grant special permission to access AWS services and resources to a Lambda Function.

Parameters:

- role (iam.Role):

### set_default_runtime

description

Parameters:

- runtime (Runtime):

### set_default_timeout

Parameters:

- timeout (Duration):

### set_default_vpc

## Commons

Common options are parameters destined to be added to every Lambda Function. The difference between default and common options is that common settings can set multiple values per category. For example, one singular Lambda Function can have multiple layers, so it is common. On the other hand, one singular Lambda Function can only assume one IAM Role, so it is default.

### add_common_environment

Parameters:

- key (str):
- value (str|int|float):

### add_common_layer

Parameters:

- layer (LayerVersion|PythonLayerVersion):

### add_common_security_group

Parameters:

- security_group (ec2.SecurityGroup):

## Customs

### add_custom_environment

Parameters:

- key (str):
- value (str|int|float):

### add_custom_layer

Parameters:

- key (str):
- value (LayerVersion|PythonLayerVersion):

### add_custom_role

Parameters:

- key (str):
- value (iam.Role):

### add_custom_runtime

Parameters:

- key (str):
- value (Runtime):

### add_custom_security_group

Parameters:

- key (str):
- value (ec2.SecurityGroup):

### add_custom_vpc

## Build your Lambda and Rest API Infraestructure

asd

## Example

asd
