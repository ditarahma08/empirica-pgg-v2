import React from "react";
import { Button } from "../components/Button";

export function Consent({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Consent Form
      </h2>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500">
            This experiment is part of a MIT scientific project. Your decision
            to participate in this experiment is entirely voluntary. There are
            no known or anticipated risks to participating in this experiment.
            There is no way for us to identify you. The only information we will
            have, in addition to your responses, is the timestamps of your
            interactions with our site. The results of our research may be
            presented at scientific meetings or published in scientific
            journals. Clicking on the "AGREE" button indicates that you are at
            least 18 years of age, and agree to participate voluntary.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>I AGREE</p>
      </Button>
    </div>
  );
}
