import "../styles/Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_center">
        <ul>
          <p>© 2024 MomentStay, Inc.</p>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Company details</li>
        </ul>
      </div>

      <div className="footer_right">
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;
