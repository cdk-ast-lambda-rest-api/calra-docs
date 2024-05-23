---
sidebar_label: "Getting Started"
sidebar_position: 1
---

# Getting Started

CALRA allows simplified resource creation for AWS Lambda functions and Rest API resources by using decorators and setting a builder with default, common or custom values for IAM Roles, Runtimes, Timeouts, Layers, Environment values, etc. This project relies abstract syntactic trees (ast) to analyze the code of your lambda functions and generate infraestructure accordingly.

### Installation

`calra_cdk` is available from PyPI as [`calra-cdk`](https://pypi.org/project/calra-cdk/) and [`carla-lambda`](https://pypi.org/project/calra-lambda/):

> pip install calra-cdk calra-lambda

### Understanding Carla CDK

The first module of CARLA comprehends a clever way of performing syntactic analysis over the directory where a developer places his lambda handlers. On the other hand, support for numerous default, common and custom configuration for these lambda resources is provided through a ResourceBuilder object.

Through this analysis and configuration, the developer build REST APIs reyling the responsability of creating resources for your API Gateway and Lambda Functions in a pretty straight-forward manner without getting caught in the repetitive process of defining each Lambda with the same or little variation over it's configuration.

### Understanding Carla Lambda

On the other hand, the Carla Lambda package contains the definition of decorators that can be applied to each lambda handler. Via this method, you can not only define what type of HTTP method and endpoint it'll listen to, but also setup custom configuration that can differenciate each lambda during resource creation time.

:::warning

It is **mandatory** that each Lambda Function you intend to route in your API Gateway via Calra's builder has at least one HTTP decorator of type GET, POST, PUT, DELETE or ANY.

If not specified, the Lambda resource will not be automatically created since it will not be part of your API Gateway routing and will have to be created manually.
:::
