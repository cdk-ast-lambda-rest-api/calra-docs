---
sidebar_label: "Decorators"
sidebar_position: 2
description: "Setup your Lambda Function options using decorators."
---

# Lambda Decorators

As previously mentioned, a developer relies on calra's cdk package to add custom options that can be applied to his Lambda Functions. But how do we associate these custom values to a specific Lambda? By the use of the decorators comprehended in calra's lambda package.
There are two types of decorators defined for this module. **HTTP Decorators** first and **Custom Decorators** on the other hand.

## HTTP Decorators

For a Lambda Function to be recognised during the building process, so the resource is created and connected to the API Gateway, an HTTP decorator is required. This decorators sets both the HTTP method and the endpoint's route. HTTP methods supported by Calra are **GET, POST, PUT, DELETE and ANY**. Let's have a quick look to an example.

```python
    from calra_lambda import *
    import json

    @GET('/dogs')
    def lambda_handler(event, context):
        response = {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Hello World from /dogs!'
            })
        }
        return response
```

By simply importing the module and adding just one decorator a developer can rest easy and not worry about defining the infrastructure for a simple Lambda Function, let alone multiple.

:::warning
At this time, you should specify the decorators as shown in the example. Do not apply other invoking methods such as `calra_lambda.GET()`.
:::

## Custom Decorators

Diving into advanced applications of Calra, the possibility of setting custom parameters for a Lambda Function during build time was talked about. On this topic there are also two types of decorators, one for configuration and the other for naming purposes.

### Naming Decorators

Two decorators are defined for this and allows the user to name the resource and set it's description. So, logically, they are called **`name`** and **`description`**.

```python
from calra_lambda import *
import json

    @GET('/dogs')
    @name('LBD-DOGS-GET')
    @description('Basic lambda handler for dogs GET route.')
    def lambda_handler(event, context):
        response = {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Hello World from /dogs!'
            })
        }
        return response
```

### Configuration Decorators

**`timeout`** and **`memory_size`** can be assigned without defining custom key-values for them during the builder definition. Instead, timeout is automatically converted to Duration.Seconds whilst memory_size is the amount of memory, in MB, that will be allocated to the Lambda Function during runtime.

**`security_group`**, **`layer`**, and **`environment`** decorators support both a list of string keys as a parameter or multiple string parameters. This is because a Lambda Function support multiple security_groups, layer and environments assigned to it. Keep in mind the string parameters have to match the **key** of custom settings defined for your builder instance, so Calra can use them to retrieve the **value**.

**`vpc`**, **`role`** and **`runtime`** decorators, on the other hand only accept a string parameter that should match the **key** of a custom configuration defined for yor builder, so Calra can use that to retrieve the **value** and assign it to your lambda function.

```python
from calra_lambda import *
import json
import os
import django
import pydantic

@DELETE('/cats/delete/{id}')
@role('lambda-rds-role')
@environment('DB_NAME_CATS','DB_HOST')
@layer(['djangoLayer','pydanticLayer'])
@memory_size(256)
def cat_handler(event, context):
    response = {
        'statusCode': 200,
        'body': json.dumps({
            'message': f"Hello from /cats! Connecting to.. {os.environ['DB_NAME_CATS']}"
        })
    }
    return response
```

:::danger
You should never add the same **configuration decorator** twice to a Lambda Handler twice. For options that can receive multiple arguments, such as security_group, layer and environment, use the multiple arguments or list as a parameter for a single decorator.
:::
