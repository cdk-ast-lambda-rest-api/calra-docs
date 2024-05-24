---
sidebar_label: "About"
sidebar_position: 1
---

# CALRA's CDK Package

## A library for AWS API Gateway/Lambda Proxy Integration

Calra CDK assumes the responsibility of creating the infraestructure for your API Gateway resources and Lambda Functions, also taking charge of creating the association between these resources and these Lambda Functions, so the routing is taken care of as well.
This API provides a ResourceBuilder class that a developer can take advantage of to set the default, common and custom settings we talked about in the [Getting Started](/docs/getting-started) page. However do not worry, we will revisit these concepts in this section.

### Installation

`calra_cdk` is available from PyPI as `calra-cdk`:

> pip install calra-cdk

Installation of [calra-lambda](https://pypi.org/project/calra-lambda/) is also required as a dependency for your lambda functions, since it provides the definition of decorators used within this module.
You can as well rely on the [Simple CARLA example](https://github.com/cdk-ast-lambda-rest-api/calra-example-simple) repository to get started.

### Example

```python
    import calra_cdk
    or
    from calra_cdk import ResourceBuilder
```

### Builder instance

You may define a builder using calra_cdk's constructor `ResourceBuilder`. This method returns an instance of the class that will be used to configure and create your Lambda Functions. By default, no parameters are required to instantiate the object, but custom options may be passed in advanced use cases.

```python
    from calra_cdk import ResourceBuilder

    builder = ResourceBuilder()
```

### Builder Configuration

If opted to, you can set default values for IAM Roles, Memory Size, Timeout, Runtime and VPC.

On the same note, support for common configuration that all the Lambda Functions will receive, such as Security Groups, Environment variables and Layers, is provided.

Lastly you can setup custom environments, layers, security groups, vpcs a Lambda Function will receive ONLY if they have the decorators defined.

```python
    from calra_cdk import ResourceBuilder
    from aws_cdk import Duration

    builder = ResourceBuilder()
    builder.set_default_timeout(Duration.seconds(15))
    builder.add_common_environment("DATABASE_URI", "something-db-related")
    builder.add_custom_environment("URL-PREFIX", "calra-cdk-") #Lambda Function should have decorator @environment("URL-PREFIX")
```

### Building

Assuming you have already instantiated a Builder, configured it and ready to deploy your stack, then simply define the directory of your Lambda Functions and build!

Note: For a Lambda Function to be recognised and built, it has to have a decorator specifying the HTTP method it responds to. Again, the [Simple CARLA example](https://github.com/cdk-ast-lambda-rest-api/calra-example-simple) repository will provide a firm example of a builder setting and proper lambda annotation using decorators defined in the [Lambda](/docs/category/lambda-package) package.

```python
[...] # Imports

class CalraExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        [...]  # Instantiating builder, defining options and layers...

        lambda_path = 'lambdas'

        restapi = apigateway.RestApi(
            self, 'calra-RestApi',
            rest_api_name= 'calra-restApi')
        root_resource = restapi.root

        builder.build(self, root_resource, lambda_path, print_tree=True)

```

:::info
In the next page, all the methods exposed by this API via the **ResourceBuilder** class itself will be thoroughly explained, with examples provided for each option.
:::
