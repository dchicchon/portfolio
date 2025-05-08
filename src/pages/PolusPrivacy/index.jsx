import React from 'react';
import styles from './Privacy.module.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Privacy() {
  return (
    <>
      <Navbar />
      <section className="legal">
        <h2 className="legal-h2">Privacy Policy</h2>
        <p className="legal-p">
          We at Polus are committed to protecting your privacy. This privacy policy
          applies to our browser extension (Polus), our website
          <a style={{ color: 'black' }} href="https://www.danielchicchon.com/code/polus">
            {' '}
            https://www.danielchicchon.com/projects/polus
          </a>
          , any subdomains of danielchicchon.com.
        </p>
        <p className="legal-p">
          The information we gather or process is used solely for core functionality of
          Polus and to improve the quality and security of our service.
          <strong>
            Your information isn’t and has never been sold to third parties.
          </strong>
        </p>
        <h4 id="what-information-is-being-stored-or-accessed">
          What information is being stored, or accessed?
        </h4>
        <h5>Polus account information</h5>
        <p className="legal-p">
          Your name, email, account settings, and extension data (such as to-dos and
          links) are transferred and stored securely, solely for your usage within our
          extension and not shared with any other third parties, except as specified in
          this policy.
        </p>
        <h5>Feature usage data</h5>
        <p className="legal-p">
          To improve the content, features and overall experience of the extension, we
          gather and log data on how our users access and use Polus Dashboard. For
          example, we may log actions like clicking on a photo source or
          completing/deleting a to-do (not the content of the to-do, just the action of
          completing/deleting it).
        </p>
        <h4 id="what-vendors-sub-processors-do-you-use">
          What vendors/sub-processors do you use?
        </h4>
        <p className="legal-p">
          We use several vendors/sub-processors to conduct various aspects of our
          business.
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unsplash</td>
              <td>
                Some photos/backgrounds are retrieved from Unsplash. A request is made
                from your IP address to download photos.
              </td>
            </tr>
          </tbody>
        </table>

        <h4 id="what-are-my-rights-in-relation-to-my-personal-data">
          What are my rights in relation to my personal data?
        </h4>
        <p className="legal-p">
          By using Polus Dashboard, you may exercise the following rights:
        </p>
        <ol>
          <li>
            <strong> The right to refuse to provide your personal data</strong>
            <br />
            The voluntary Personal Data you provide to us is an integral part of your use
            of Polus Dashboard. You can choose to forego the provision of that data, but
            you will be restricted from using our services.
          </li>
          <li>
            <strong>The right to access and modify your personal data</strong>
            <br />
            Through your use of Polus Dashboard, you can access and amend your own data at
            any time. This includes adding, editing and deleting other Polus data like
            your to-dos.
          </li>
          <li>
            <strong> The right to be forgotten</strong>
            <br />
            You can manually delete your account by clicking Delete my account on your
            Polus account’s Profile page at any time. See the “What happens to my data
            when I delete my account?” section below to learn more about the deletion
            process.
          </li>
          <li>
            <strong>The right to obtain your personal data </strong>
            <br />
            Upon request, we will provide a data export of all your data stored in our
            system. If you wish to receive an export of your data, or have any problems
            deleting your account, please contact us.
          </li>
          <li>
            <strong> The right to submit a complaint </strong>
            <br />
            If you have a complaint about the way in which your Personal Data is handled,
            please contact us. After submitting a complaint, we will reply within five (5)
            business days to confirm that we have received your complaint. After receiving
            your complaint, we will investigate it and provide you with our response
            within two (2) weeks.
          </li>
          <li>
            <strong>
              The right to submit a complaint with a data protection authority
            </strong>
            <br />
            If you are a resident of the European Union, and you are not satisfied with
            the outcome of the complaint submitted to us, you have the right to lodge a
            complaint with your local data protection authority.
          </li>
        </ol>
        <h4 id="what-happens-to-my-data-when-i-delete-my-account">
          What happens to my data when I delete my account?
        </h4>
        <p className="legal-p">
          Upon account deletion, your account is flagged as deleted and your data is no
          longer accessible. This data is stored for a grace period (90 days) to allow for
          account recovery in the case of accidental or malicious deletion, or your desire
          to reopen your account. Upon request, you can expedite the process of performing
          a hard delete to remove all of your personal data from our databases. After a
          hard delete, your data will be deleted from our system, but could still be
          present in encrypted database backups for up to an additional 35 days.
        </p>
        <p className="legal-p">
          To request an expedited hard delete, please{' '}
          <a href="mailto:danielchicchon@gmail.com"> contact us.</a>
        </p>
        <h4 id="is-my-data-secure"> Is my data secure?</h4>
        <p className="legal-p">Data security is a priority at all times.</p>
        <h4 id="will-the-privacy-policy-change">Will the privacy policy change?</h4>
        <p className="legal-p">
          Although most changes are likely to be minor, Polus may change its Privacy
          Policy from time to time, and at Polus' sole discretion. Polus encourages
          visitors to frequently check this page for any changes to its Privacy Policy.
          Your continued use of this site after any change in this Privacy Policy will
          constitute your acceptance of such change.
        </p>
        <p className="legal-p">
          If you have any questions about Polus' Privacy policy, please
          <a href="mailto:danielchicchon@gmail.com"> contact us.</a>
        </p>
        <p className="last-updated">Last updated September 14, 2020</p>
      </section>
      <Footer />
    </>
  );
}

export default Privacy;
