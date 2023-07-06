# Mailchimp Email Collector

This is a simple serverless application that forwards email addresses to
Mailchimp. This can be used, for example, on landing pages that you want to
collect email addresses on!

## Development

Make sure that `env.json` exists (look at `env.json.example`) and has the
correct values in it. Then you can run it using the following workflow.

```
$ sam build
# ...
$ sam local invoke PutEmailFunction -n ./env.json -e ./events/event-post-email.json 
# ...
```

## Deployment

We can use the SAM API for deployments. Use the following command.

```
$ sam deploy --parameter-overrides MailchimpServerPrefix=<PREFIX> MailchimpAPIKey=<KEY> MailchimpAudienceID=<ID>  \
  --region eu-central-1 \
  --profile my-profile
```

## Usage

```
$  curl --data-binary '{"email": "example@example.com"}' https://abcdefg123456.execute-api.eu-central-1.amazonaws.com/Prod/
