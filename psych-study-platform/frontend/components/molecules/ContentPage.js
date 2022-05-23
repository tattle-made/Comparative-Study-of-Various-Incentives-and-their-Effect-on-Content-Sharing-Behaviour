import { FeedOnboarding } from "./FeedOnboarding";
import { FeedFinished } from "./FeedFinished";
import { FeedPostTestSurvey } from "./FeedPostTestSurvey";
import { FeedConsent } from "./FeedConsent";

/**
 *
 * dataFeed is the response returned from GET /feed
 * ensure that dataFeed.type === 'PAGE' is true.
 */
const ContentPage = ({ dataFeed }) => {
  return (
    <>
      {dataFeed && dataFeed.type === "PAGE"
        ? (() => {
            switch (dataFeed.page) {
              case "CONSENT":
                return <FeedConsent />;
              case "ONBOARDING":
                return <FeedOnboarding />;
              case "POST_TEST_SURVEY":
                return <FeedPostTestSurvey />;
              case "FINISHED":
                return <FeedFinished />;
              default:
                return null;
            }
          })()
        : null}
    </>
  );
};

export default ContentPage;
