---
sidebar_label: "Introduction"
sidebar_position: 0
---

# CDK Ast Lambda Rest API (CALRA)

Calra is a package built on top of AWS Cloud Development Kit (CDK) to simplify the process and ease of doing infrastructure for REST APIs and Lambda Functions. It features automated resource generation with as little configuration as possible. Implement your Lambda Handlers, setup decorators and builder and forget about the rest.

Nex you will look at a **Quick Example** on the Stack side before diving into the more technic specifications of this package.

### Quick Example

```python
from aws_cdk import *
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

The example shown is based of Calra's [simple example repository](https://github.com/cdk-ast-lambda-rest-api/calra-example-simple).

To learn more about how to use Calra, read the tutorials available in the left menu. Begin with [Getting Started](/docs/getting-started).
