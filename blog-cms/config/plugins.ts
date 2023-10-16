export default ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        blog: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Public"],
      approvalFlow: ["api::blog.blog"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
      },
      blockedAuthorProps: ["name", "email"],
      reportReasons: {},
      gql: {},
    },
  },
  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        key: env("AWS_SES_KEY"),
        secret: env("AWS_SES_SECRET"),
        amazon: "https://email.ap-south-1.amazonaws.com",
      },
      settings: {
        defaultFrom: "Hyperce <noreply@hyperce.io>",
      },
    },
  },
});
