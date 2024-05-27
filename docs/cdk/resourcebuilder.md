---
sidebar_label: "Resource Builder"
sidebar_position: 2
description: "Builder instance"
---

# Class Resource Builder

## ResourceBuilder Constructor

Before starting to customize our builder object, we have to instantiate it. Whilst it is possible to define the options before instantiating the builder and send them as a parameter, we recommend creating a new object instance and then start defining it's customized default, common and custom options.

<!-- Parameters:

- example (Optional[]): -->

```python
from aws_cdk import (
    Duration,
    Stack,
    aws_iam as iam,
    aws_lambda,
    aws_lambda_python_alpha,
    aws_apigateway as apigateway,

)
from calra_cdk import ResourceBuilder
from constructs import Construct

class CalraExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        builder = ResourceBuilder()
```

# Methods

Calra CDK supports various methods divided in three categories: Defaults, Commons and Customs, referencing the topic of the option being added to the builder.

## Defaults

The ResourceBuilder instance is able to set default options for numerous Lambda Function's parameters (And only one value per category). This default options will be assigned to each function created through the Builder and can only be overridden on a case to casis basis using [Lambda Decorators](/docs/category/lambda-package).

### set_default_memory_size

Sets the default amount of memory, in MB, that is allocated to all Lambda Function's created via this CDK's ResourceBuilder instance.

Parameters:

- memory_size (int)

```python
        builder.set_default_memory_size(256)
```

### set_default_role

Sets the default role that grants special permissions to access AWS services and resources to all Lambda Function's created via this CDK's ResourceBuilder instance.

Parameters:

- role (iam.Role)

```python
        default_role = iam.Role(
            self, "calra-role",
            assumed_by= iam.ServicePrincipal('lambda.amazonaws.com'),
            managed_policies= [
                iam.ManagedPolicy.from_aws_managed_policy_name('service-role/AWSLambdaBasicExecutionRole')
            ]
        )
        builder.set_default_role(default_role)
```

### set_default_runtime

A default runtime will be assigned as an option to all Lambda Function's created via this CDK's ResourceBuilder instance if not specified a custom one.

Parameters:

- runtime (Runtime)

```python
        python38 = aws_lambda.Runtime.PYTHON_3_8
        builder.set_default_runtime(python38)
```

### set_default_timeout

Sets how much time every Lambda Function will have by default to complete it's execution before it's aborted. Keep in mind an API Gateway already sets a maximum timeout of 15 seconds, so this option should be in the range from 0 to 15 seconds.

Parameters:

- timeout (Duration)

```python
        default_timeout = Duration.seconds(10)
        builder.set_default_timeout(default_timeout)
```

### set_default_vpc

## Commons

Common options are parameters destined to be added to every Lambda Function. The difference between default and common options is that common settings can set multiple values per category. For example, a singular Lambda Function can have multiple layers, so it is common. On the other hand, one singular Lambda Function can only assume one IAM Role, so it is default.

### add_common_environment

Adds a new common environment variable. Lambda Functions created via this CDK's ResourceBuilder instance will be assigned this option.

Parameters:

- key (str)
- value (str|int|float)

```python
        builder.add_common_environment("URL", "http://example.com")
```

### add_common_layer

Adds a new common layer. Lambda Functions created via this CDK's ResourceBuilder instance will be assigned this option.

Parameters:

- layer (LayerVersion|PythonLayerVersion)

```python
        layer = aws_lambda_python_alpha.PythonLayerVersion(
                self, "calra-lambda",
                entry="./layers",
                compatible_runtimes=[aws_lambda.Runtime.PYTHON_3_10, aws_lambda.Runtime.PYTHON_3_11]
            )
        builder.add_common_layer(layer)
```

### add_common_security_group

Adds a new common security group. Lambda Functions created via this CDK's ResourceBuilder instance will be assigned this option.

:::warning
Keep in mind a security group will only work if the Lambda Function is assigned the same VPC as the Security Group.
:::

Parameters:

- security_group (ec2.SecurityGroup)

## Customs

### add_custom_environment

Registers a custom environment variable as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

Parameters:

- key (str)
- value (str|int|float)

```python
        builder.add_common_environment("URL", "http://example.com")
```

### add_custom_layer

Registers a layer runtime as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

Parameters:

- key (str)
- value (LayerVersion|PythonLayerVersion)

```python
        custom_layer = aws_lambda_python_alpha.PythonLayerVersion(
                self, "calra-lambda",
                entry="./layers/django",
                compatible_runtimes=[aws_lambda.Runtime.PYTHON_3_10, aws_lambda.Runtime.PYTHON_3_11]
            )
        builder.add_custom_layer("django", custom_layer)
```

### add_custom_role

Registers a custom role as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

Parameters:

- key (str)
- value (iam.Role)

```python
        custom_role = iam.Role(
            self, "calra-role",
            assumed_by= iam.ServicePrincipal('lambda.amazonaws.com'),
            managed_policies= [
                iam.ManagedPolicy.from_aws_managed_policy_name('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.from_aws_managed_policy_name('service-role/AWSLambdaKinesisExecutionRole'),
                iam.ManagedPolicy.from_aws_managed_policy_name('service-role/AmazonS3ObjectLambdaExecutionRolePolicy')
            ]
        )
        builder.add_custom_role("kinesis_s3_connection", custom_role)
```

### add_custom_runtime

Registers a custom runtime as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

Parameters:

- key (str)
- value (Runtime)

:::info

When instantiating a ResourceBuilder, custom runtimes going from Python 3.8 to 3.12 are also created. A developer can directly set these custom runtimes using the following keys without the need of declaring custom runtimes: 'python3.8', 'python3.9', 'python3.10', 'python3.11' and 'python3.12'.
:::

### add_custom_security_group

Registers a custom security group as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

:::warning
Keep in mind a security group will only work if the Lambda Function is assigned the same VPC as the Security Group.
:::

Parameters:

- key (str)
- value (ec2.SecurityGroup)

### add_custom_vpc

Registers a custom virtual private network as an option for your builder that can be referenced with a key via the runtime decorator in your Lambda Function.

## Build your Lambda and Rest API Infraestructure

After having customized a ResourceBuilder object, invoking the **`build`** method will take care of creating the infraestructure for your Lambda Functions and Rest API resources. For this, you need to previously define the path to where the code for your Lambda's is stored and the API Gateway root resource you want the routing to be based off.

```python
class CalraExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        builder = ResourceBuilder()

        lambda_path = 'lambdas'

        restapi = apigateway.RestApi(
            self, 'calra-RestApi',
            rest_api_name= 'calra-restApi')
        root_resource = restapi.root

        builder.build(self, root_resource, lambda_path, print_tree=True)
```

## Full Example

The following code snippet features the CDK side of the example shown in [**CALRA's Simple Example repository**](https://github.com/cdk-ast-lambda-rest-api/calra-example-simple).

```python
from aws_cdk import (
    Duration,
    Stack,
    aws_iam as iam,
    aws_lambda as _lambda,
    aws_lambda_python_alpha as _lambda_python,
    aws_apigateway as apigateway,
    aws_ec2 as ec2
)
from calra_cdk import ResourceBuilder
from constructs import Construct

class CalraExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        builder = ResourceBuilder()
        lambda_path = 'lambdas'

        restapi = apigateway.RestApi(
            self, 'calra-RestApi',
            rest_api_name= 'calra-restApi')
        root_resource = restapi.root

        builder.set_default_timeout(Duration.seconds(10))
        builder.set_default_runtime(_lambda.Runtime.PYTHON_3_10)
        builder.add_common_environment("URL", "http://example.com")
        builder.add_custom_environment("DB_NAME_CATS", "cats")
        builder.add_custom_environment("DB_NAME_DOGS", "dogs")

        builder.build(self, root_resource, lambda_path, print_tree=True)
```
