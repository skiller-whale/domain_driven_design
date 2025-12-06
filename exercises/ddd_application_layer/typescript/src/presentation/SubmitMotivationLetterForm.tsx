import { useState } from "react";
import type { SubmitMotivationLetterService } from "../application/SubmitMotivationLetterService";

// This component illustrates one way we could use DDD with the frontend.

// It is a form for submitting a motivation letter.

// Its job is purely presentation. It takes a service which represents the
// actual job of submitting a motivation letter.

// The service is constructed with a repository. In a backend system it might
// connect straight to a database. In a frontend system, it may make API calls
// to a backend (though these will need separate validation).

// By using an application service layer and a domain model layer directly in
// the frontend system, we are able to benefit from all of the intelligence we
// have embedded in the domain model.

type SubmitMotivationLetterFormProps = {
  service: SubmitMotivationLetterService;
  applicationId: string;
}

export function SubmitMotivationLetterForm({ service, applicationId }: SubmitMotivationLetterFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const motivationLetter = formData.get('motivationLetter') as string;
    try {
      // Call the application service to submit the motivation letter
      service.execute({ applicationId, motivationLetter });
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div id="errors">{error}</div>
      <label>
        Motivation Letter:
        <textarea name="motivationLetter" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
}

