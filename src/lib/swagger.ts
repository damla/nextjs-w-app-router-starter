import { createSwaggerSpec } from 'next-swagger-doc';

export async function getApiDocs() {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Starter App API',
        version: '1.0'
      },
      components: {
        schemas: {
          initPostApi: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'The post title',
                example: 'My post title'
              },
              content: {
                type: 'string',
                description: 'The post content',
                example: 'My post content'
              },
              isPublished: {
                type: 'boolean',
                description: 'The post is published or not',
                example: true
              }
            },
            required: ['title', 'content', 'isPublished']
          }
        },
        // Swagger UI does not support cookie authentication out of the box therefore,
        // authentication need to be done on the UI manually.
        // https://swagger.io/docs/specification/authentication/cookie-authentication/
        // https://github.com/swagger-api/swagger-js/issues/1163
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            name: 'next-auth.session-token',
            in: 'cookie'
          }
        }
      },
      security: [{ cookieAuth: [] }]
    }
  });
  return spec;
}
