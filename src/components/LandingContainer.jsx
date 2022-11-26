import phoneImage from "../assets/phone.svg";
import businessImage from "../assets/business.webp";

export default function LandingContainer() {
  return (
    <>
      <div className="landing-container">
        <div className="become-smarter">
          <div>
            <h1>Become smarter in just 5 minutes</h1>
            <p>
              Get the daily email that makes reading the news enjoyable. Stay
              informed and entertained, for free.
            </p>
            <div className="email-input-wrapper">
              <input type="email" placeholder="youremail@domain.com" />
              <button>Try It</button>
            </div>
          </div>
        </div>
        <a className="side wrapper-link" href="#">
          <img src={businessImage} alt="an ad to a business course" />
          <h2 className="side-headline">
            Listen to our Business Casual Podcast
          </h2>
          <p className="side-description">
            Journalist Nora Ali brings you conversations with creators,
            thinkers, and innovators who can tell you what it all means, and why
            you should care.
          </p>
          <p className="author bold">IN PARTNERSHIP WITH REAL VISION</p>
        </a>
      </div>
      <a className="latest-banner wrapper-link" href="#">
        <img src={phoneImage} alt="A phone" />
        <b>LATEST NEWSLETTER:</b>
        <span>How the climate bill will transform America’s homes...</span>
      </a>
    </>
  );
}
