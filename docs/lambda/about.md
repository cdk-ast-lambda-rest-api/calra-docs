---
sidebar_label: "About"
sidebar_position: 1
---

# CALRA's Lambda Package

## A library for AWS API Gateway/Lambda Proxy Integration

CALRA allows simplified resource creation for AWS Lambda functions and Rest API resources by using decorators and setting a builder with default, common or custom values for IAM Roles, Runtimes, Timeouts, Layers, Environment values, etc.

This module provides the definition of decorators that are used within lambda handlers to add special configuration options for your Lambda Function.

### Installation

`calra_lambda` is available from PyPI as `calra-lambda`:

> pip install calra-lambda

You can as well rely on the [Simple CARLA example](https://github.com/cdk-ast-lambda-rest-api/calra-example-simple) repository to get started.
To take full advantage of this package, installation of [calra-cdk](https://pypi.org/project/calra-cdk/) is recommended.

### Add decorators to your Lambda Handler

The decorators defined within this package are:

- GET, POST, PUT, DELETE, ANY are explicitly required for every handler and need to be defined with a custom path for your REST Endpoint.
- timeout will accept an integer value that will be transformed to duration in terms of seconds for a Lambda Function.
- memory_size will accept an integer value to specify the memory that will be assigned to each instance of your Lambda Function.
- name and description assign a custom string value passed as parameter to your Lambda Function's name and description.
- runtime, role, vpc. Each decorator receives a name string as identifier for a custom value defined for your stack using the [calra-cdk](https://pypi.org/project/calra-cdk/) module.
- environment, layer and security_group decorators can receive multi arguments or a list with the names of custom environment/layers/security_groups defined for your stack using the [CDK](/docs/category/cdk-package) package.

```python
    from calra_lambda import *
    import json

    @GET('/dogs')
    @runtime('python3.11')
    @name('LBD-DOGS-GET')
    @memory_size(256)
    def lambda_handler(event, context):
        response = {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Hello World from /dogs!'
            })
        }
        return response
```
