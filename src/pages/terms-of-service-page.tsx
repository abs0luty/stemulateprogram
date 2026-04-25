import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { TransitionLink } from "@/components/common/transition-link"

const TermsOfServicePageContent: FC = () => {
  return (
    <main className="min-h-screen bg-neutral-900 px-4 py-24 text-neutral-100 md:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Title */}
        <p className="font-bold text-2xl md:text-4xl font-serif">
          Terms of Service for STEMulate Research Program
        </p>
        {/* Effective Date */}
        <p className="text-lg sm:text-xl md:text-2xl">
          <b>Effective Date: June 25, 2025.</b>
        </p>
        {/* Introduction Paragraph 1 */}
        <p className="text-lg md:text-xl">
          Please read these Terms of Service ("Terms") carefully before using
          the STEMulate Research Program application portal or participating in
          the STEMulate Research Program ("Program"). These Terms constitute a
          legal agreement between you ("Applicant," "Participant," "you") and
          STEMulate ("we," "us," or "our").
        </p>
        {/* Introduction Paragraph 2 */}
        <p className="text-lg md:text-xl">
          By accessing or using our application portal, submitting an
          application, or participating in the Program, you agree to be bound by
          these Terms and our Privacy Policy. If you do not agree to these
          Terms, you may not use the application portal or participate in the
          Program.
        </p>
        <hr className="border-t border-neutral-700" />

        {/* 1. Acceptance of Terms */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          1. Acceptance of Terms
        </p>
        <p className="text-lg md:text-xl">
          By using the STEMulate application portal or participating in the
          Program, you affirm that you are of legal age to enter into this
          agreement in your jurisdiction, or have obtained parental/guardian
          consent if you are a minor but eligible to participate. You agree that
          you have read, understood, and accept all of the terms and conditions
          contained in these Terms of Service.
        </p>

        {/* 2. Program Overview */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          2. Program Overview
        </p>
        <p className="text-lg md:text-xl">
          The STEMulate Research Program is designed to foster research skills
          and provide mentorship to students through a two-step process: the{" "}
          <b>Research Writing Bootcamp</b> and the{" "}
          <b>Individual Research Mentorship Program</b>. Detailed descriptions
          of these programs are available on our website.
        </p>

        {/* 3. Eligibility */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          3. Eligibility
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>General Requirements</b>: Applicants must meet the eligibility
            criteria outlined on the STEMulate website for the specific program
            they are applying to. This typically includes academic
            qualifications, age requirements, and any other prerequisites.
          </li>
          <li>
            <b>Accuracy of Information</b>: You agree to provide accurate,
            current, and complete information during the application process and
            throughout your participation in the Program. Misrepresentation of
            information may lead to the rejection of your application or
            termination of your participation.
          </li>
        </ul>

        {/* 4. Application Process */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          4. Application Process
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Submission</b>: All applications must be submitted through the
            official STEMulate application portal by the specified deadlines.
          </li>
          <li>
            <b>Fees</b>: If any application fees are required, they are
            non-refundable unless otherwise stated.
          </li>
          <li>
            <b>Evaluation</b>: Applications will be evaluated based on the
            criteria set forth by STEMulate. Admission to the Program is at the
            sole discretion of STEMulate.
          </li>
        </ul>

        {/* 5. Participant Responsibilities */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          5. Participant Responsibilities
        </p>
        <p className="text-lg md:text-xl">
          If accepted into the Program, you agree to:
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Active Participation</b>: Engage actively in all required
            components of the Bootcamp and Mentorship Program, including
            workshops, meetings, and assignments.
          </li>
          <li>
            <b>Ethical Conduct</b>: Conduct all research and academic activities
            with integrity, adhering to ethical guidelines, academic honesty,
            and avoiding plagiarism.
          </li>
          <li>
            <b>Compliance</b>: Abide by all Program rules, policies, and
            instructions provided by STEMulate staff and mentors.
          </li>
          <li>
            <b>Communication</b>: Maintain open and timely communication with
            your assigned mentor and Program staff.
          </li>
        </ul>

        {/* 6. Intellectual Property */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          6. Intellectual Property
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            <b>Your Research</b>: Subject to any specific agreements between you
            and STEMulate or your mentor, you generally retain the intellectual
            property rights to the original research you produce during the
            Individual Research Mentorship Program.
          </li>
          <li>
            <b>Program Materials</b>: All materials provided by STEMulate as
            part of the Program (e.g., curriculum, presentations, templates,
            software access) remain the intellectual property of STEMulate or
            its licensors. You may not reproduce, distribute, modify, or create
            derivative works from these materials without explicit written
            permission from STEMulate.
          </li>
          <li>
            <b>Showcasing Research</b>: You grant STEMulate a non-exclusive,
            worldwide, royalty-free license to use, reproduce, display, and
            distribute your research outcomes (e.g., paper title, abstract,
            presentation slides, name, and image) for promotional, educational,
            or archival purposes of the STEMulate Program, unless otherwise
            expressly agreed in writing.
          </li>
        </ul>

        {/* 7. Confidentiality */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          7. Confidentiality
        </p>
        <ul className="list-disc pl-6 text-lg md:text-xl space-y-2">
          <li>
            You may be exposed to confidential information belonging to
            STEMulate, other participants, or third parties during the Program.
            You agree to keep such information confidential and not to disclose
            or use it for any purpose other than your participation in the
            Program.
          </li>
          <li>
            Discussions and specific feedback exchanged within the mentorship
            program are considered confidential between the participant and
            mentor, unless explicit consent is given for sharing.
          </li>
        </ul>

        {/* 8. Disclaimers */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          8. Disclaimers
        </p>
        <p className="text-lg md:text-xl">
          THE APPLICATION PORTAL AND THE PROGRAM ARE PROVIDED "AS IS" AND "AS
          AVAILABLE," WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED. STEMULATE DOES NOT WARRANT THAT THE PORTAL WILL BE
          UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER
          HARMFUL COMPONENTS. STEMULATE DOES NOT GUARANTEE SPECIFIC OUTCOMES
          FROM PROGRAM PARTICIPATION.
        </p>

        {/* 9. Limitation of Liability */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          9. Limitation of Liability
        </p>
        <p className="text-lg md:text-xl">
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, STEMULATE, ITS
          DIRECTORS, EMPLOYEES, AFFILIATES, AGENTS, AND MENTORS SHALL NOT BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA,
          USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR
          ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE APPLICATION
          PORTAL OR PROGRAM; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON
          THE PORTAL; (III) ANY CONTENT OBTAINED FROM THE PORTAL; AND (IV)
          UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR
          CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
          NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN
          INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>

        {/* 10. Indemnification */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          10. Indemnification
        </p>
        <p className="text-lg md:text-xl">
          You agree to defend, indemnify, and hold harmless STEMulate, its
          affiliates, directors, officers, employees, and agents from and
          against any and all claims, damages, obligations, losses, liabilities,
          costs, or debt, and expenses (including but not limited to attorney's
          fees), arising from: (a) your use of and access to the application
          portal or Program; (b) your violation of any term of these Terms; (c)
          your violation of any third-party right, including without limitation
          any copyright, property, or privacy right; or (d) any claim that your
          conduct caused damage to a third party.
        </p>

        {/* 11. Termination */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          11. Termination
        </p>
        <p className="text-lg md:text-xl">
          We may terminate or suspend your access to the application portal
          and/or your participation in the Program immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms. Upon termination, your right to
          use the service will immediately cease.
        </p>

        {/* 12. Governing Law */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          12. Governing Law
        </p>
        <p className="text-lg md:text-xl">
          These Terms shall be governed and construed in accordance with the
          laws of the Republic of Kazakhstan, without regard to its conflict of
          law provisions.
        </p>

        {/* 13. Changes to These Terms */}
        <p className="font-bold text-xl md:text-3xl font-serif">
          13. Changes to These Terms
        </p>
        <p className="text-lg md:text-xl">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will provide at
          least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole
          discretion. By continuing to access or use our application portal or
          Program after any revisions become effective, you agree to be bound by
          the revised terms.
        </p>

        <p className="text-lg md:text-xl">
          If you have any questions or concerns about this document, please{" "}
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

export const TermsOfServicePage: FC = () => (
  <StandartLayout footerTopFade headerBottomFade>
    <TermsOfServicePageContent />
  </StandartLayout>
)
