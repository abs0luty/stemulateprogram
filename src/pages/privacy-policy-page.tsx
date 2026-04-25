import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { TransitionLink } from "@/components/common/transition-link"

const PrivacyPolicyPageContent: FC = () => {
  return (
    <main className="min-h-screen bg-neutral-900 px-4 py-24 text-neutral-100 md:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Title */}
        <p className="font-bold text-2xl md:text-4xl font-serif">
          Privacy Policy for STEMulate Research Program
        </p>
        {/* Effective Date */}
        <p className="text-lg sm:text-xl md:text-2xl">
          <b>Effective Date: June 25, 2025.</b>
        </p>
        {/* Introduction Paragraph 1 */}
        <p className="text-lg md:text-xl">
          This Privacy Policy describes how STEMulate ("we," "us," or "our")
          collects, uses, stores, and shares information through our research
          program, including our application portal. We are committed to
          protecting the privacy of our applicants and participants.{" "}
        </p>
        {/* Introduction Paragraph 2 */}
        <p className="text-lg md:text-xl">
          By accessing or using our application portal or participating in the
          STEMulate Research Program, you agree to the collection and use of
          your information in accordance with this policy.
        </p>
        <hr className="border-t border-neutral-700" />

        {/* 1. Information We Collect */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          1. Information We Collect
        </p>
        <p className="text-lg md:text-xl">
          We collect various types of information from and about users of our
          application portal and participants in our research program:
        </p>

        {/* 1.1. Information You Provide Directly */}
        <p className="font-bold text-lg md:text-2xl font-serif">
          1.1. Information You Provide Directly
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Personal Identification Information</b>: Name, email address,
            phone number, date of birth, gender, nationality, country of
            residence.
          </li>
          <li>
            <b>Application Information</b>: Educational history (e.g., school,
            grades, transcripts), extracurricular activities, essays, statements
            of purpose, recommendations, CVs/resumes, and any other information
            required for program eligibility and selection.
          </li>
          <li>
            <b>Demographic Information (Optional)</b>: Information such as
            ethnicity, race, or socio-economic background, which may be
            collected for diversity initiatives or statistical purposes, always
            with your explicit consent.
          </li>
          <li>
            <b>Communication Data</b>: Records of your correspondence with us,
            including emails and messages sent through the portal.
          </li>
          <li>
            <b>Payment Information</b>: If any fees are associated with the
            application or program, we may collect payment details, though this
            is typically processed through secure third-party payment gateways.
          </li>
        </ul>

        {/* 1.2. Research-Specific Information (for Program Participants) */}
        <p className="font-bold text-lg md:text-2xl font-serif">
          1.2. Research-Specific Information (for Program Participants)
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Research Data</b>: Any data, findings, or content you generate or
            submit as part of your research project during the program. This may
            include experimental results, written reports, presentations, code,
            or datasets. The nature of this data will depend on your specific
            research area.
          </li>
          <li>
            <b>Mentorship Interaction Data</b>: Records of interactions and
            feedback sessions with your assigned mentor.
          </li>
        </ul>

        {/* 1.3. Information Collected Automatically */}
        <p className="font-bold text-lg md:text-2xl font-serif">
          1.3. Information Collected Automatically
        </p>
        <p className="text-lg md:text-xl">
          When you visit our application portal, we may automatically collect
          certain information:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Technical Data</b>: IP address, browser type and version,
            operating system, device type, referral sources, and unique device
            identifiers.
          </li>
        </ul>

        {/* 2. How We Collect Information */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          2. How We Collect Information
        </p>
        <p className="text-lg md:text-xl">
          We collect information through various methods:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Directly from You</b>: When you register on the application
            portal, fill out application forms, submit documents, communicate
            with us, or provide information during the research program.
          </li>
          <li>
            <b>From Third Parties</b>: We may receive information from third
            parties, such as educational institutions (e.g., transcripts) or
            recommenders (e.g., recommendation letters), strictly as part of
            your application process and with your consent.
          </li>
          <li>
            <b>Automatically</b>: As you navigate and interact with our
            application portal, your browser automatically sends information
            about your device.
          </li>
        </ul>

        {/* 3. How We Use Your Information */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          3. How We Use Your Information
        </p>
        <p className="text-lg md:text-xl">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Program Administration</b>: To process your application, evaluate
            your eligibility, manage your participation in the research program,
            and communicate with you about program-related matters.
          </li>
          <li>
            <b>Research Purposes</b>: For program participants, your submitted
            research data will be used to facilitate your research project, for
            mentorship, and potentially for showcasing program outcomes (e.g.,
            on our website, in reports), always in accordance with any specific
            agreements or consents obtained for your research.
          </li>
          <li>
            <b>Communication</b>: To respond to your inquiries, send you
            updates, notifications, and other relevant information about the
            program.
          </li>
          <li>
            <b>Program Improvement</b>: To analyze usage trends, improve the
            functionality and user experience of our application portal, and
            enhance the quality and effectiveness of our research program.
          </li>
          <li>
            <b>Security and Fraud Prevention</b>: To protect our systems,
            prevent fraudulent activities, and ensure the security of our
            services.
          </li>
        </ul>

        {/* 4. How We Share Your Information */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          4. How We Share Your Information
        </p>
        <p className="text-lg md:text-xl">
          We may share your information with the following categories of
          recipients:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Mentors and Program Staff</b>: Relevant personal and application
            information, as well as your research data, will be shared with
            mentors and core program staff for the purpose of guiding your
            research and administering the program.
          </li>
          <li>
            <b>Partner Institutions/Organizations</b>: If the program involves
            partnerships with other academic institutions, research
            organizations, or universities, relevant information may be shared
            with them for program administration, joint research initiatives, or
            academic credit, with your explicit consent where required.
          </li>
          <li>
            <b>Service Providers</b>: We may share information with third-party
            service providers who perform services on our behalf, such as cloud
            hosting, payment processing, email delivery, and data analytics.
            These providers are obligated to protect your information and use it
            only for the purposes for which it was shared.
          </li>
        </ul>

        {/* 5. Data Security */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          5. Data Security
        </p>
        <p className="text-lg md:text-xl">
          We implement appropriate technical and organizational measures to
          protect your information from unauthorized access, alteration,
          disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            Using secure servers and encryption (SSL/TLS) for data transmission.
          </li>
          <li>Implementing access controls and authentication mechanisms.</li>
          <li>Regular security audits and updates.</li>
        </ul>

        {/* 6. Data Retention */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          6. Data Retention
        </p>
        <p className="text-lg md:text-xl">
          We retain your personal information only for as long as necessary to
          fulfill the purposes for which it was collected, including for the
          purposes of satisfying any legal, accounting, or reporting
          requirements.
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Application Data</b>: Information for unsuccessful applicants may
            be retained for a limited period (e.g., 1-2 years) for
            record-keeping and in case future opportunities arise, unless you
            request earlier deletion.
          </li>
          <li>
            <b>Participant Data</b>: Data for program participants will be
            retained for the duration of your participation and for a reasonable
            period thereafter to allow for follow-up, alumni engagement, and to
            meet legal or research archiving requirements.
          </li>
          <li>
            <b>Research Data</b>: Specific retention policies for research data
            will be outlined in any individual research agreements, considering
            ethical guidelines and scientific necessity.
          </li>
        </ul>

        {/* 7. Your Rights */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          7. Your Rights
        </p>
        <p className="text-lg md:text-xl">
          Depending on your jurisdiction, you may have the following rights
          regarding your personal information:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Right to Access</b>: Request a copy of the personal information
            we hold about you.
          </li>
          <li>
            <b>Right to Rectification</b>: Request correction of inaccurate or
            incomplete personal information.
          </li>
          <li>
            <b>Right to Erasure (Right to be Forgotten)</b>: Request the
            deletion of your personal information under certain circumstances.
          </li>
          <li>
            <b>Right to Restrict Processing</b>: Request that we limit the way
            we use your personal information.
          </li>
          <li>
            <b>Right to Data Portability</b>: Request a copy of your personal
            information in a structured, commonly used, and machine-readable
            format.
          </li>
          <li>
            <b>Right to Object</b>: Object to the processing of your personal
            information in certain situations.
          </li>
          <li>
            <b>Right to Withdraw Consent</b>: If we are relying on your consent
            to process your information, you have the right to withdraw that
            consent at any time.
          </li>
        </ul>
        <p className="text-lg md:text-xl">
          To exercise any of these rights, please contact us using the details
          provided below.
        </p>

        <p className="font-bold text-xl md:text-3xl font-serif">
          8. Changes to This Privacy Policy
        </p>
        <p className="text-lg md:text-xl">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any significant changes by posting the
          new policy on this page and updating the "Effective Date" at the top.
          We encourage you to review this Privacy Policy periodically.
        </p>

        <p className="text-lg md:text-xl">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please{" "}
          <TransitionLink
            className="text-red-400 transition hover:text-red-300 hover:underline"
            to="/contact-info"
          >
            contact us
          </TransitionLink>
          .
        </p>
        <p className="text-lg md:text-xl">
          Thank you for your trust in STEMulate Research Program.
        </p>
      </div>
    </main>
  )
}

export const PrivacyPolicyPage: FC = () => (
  <StandartLayout footerTopFade headerBottomFade>
    <PrivacyPolicyPageContent />
  </StandartLayout>
)
