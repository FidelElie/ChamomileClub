import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ValidateLoginCodeInterfaces } from "@thechamomileclub/api";
import {
  Button,
  Copy,
  Heading,
  Flex,
  Show,
  Banner,
} from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import { useValidateLoginCode } from "@/library/queries";

import { LandingStackNavigationProps, LandingStackRouteProps } from "./_types";

import { OneTimePasswordDisplay } from "@/components/screens/otp/OneTimePasswordDisplay";

export type SubmissionErrors =
  | null
  | ValidateLoginCodeInterfaces["400"]
  | ValidateLoginCodeInterfaces["401"];

const OneTimePasswordScreen = () => {
  const {
    params: { keyId },
  } = useRoute<LandingStackRouteProps<"OTP">>();
  const navigation = useNavigation<LandingStackNavigationProps>();

  const { login } = useAuth();
  const [error, setError] = useState<SubmissionErrors>(null);

  const validateLoginCode = useValidateLoginCode({
    onSuccess: (response) => login(response.token),
    onError: (error) => setError(error.response || null),
  });

  const submitLoginCode = (code: string) => {
    setError(null);
    validateLoginCode.mutate({ keyId, code });
  };

  return (
    <Flex className="items-center justify-center flex-grow">
      <Flex.Column className="mb-6 space-y-2 items-center">
        <Heading size="xl">Enter your code</Heading>
        <Copy color="cream" className="text-center">
          Please enter the one time password we have sent to your email
        </Copy>
      </Flex.Column>
      <Flex.Column className="space-y-3">
        <Show if={error}>
          <Banner.Error className="mb-3">
            <Copy color="midnight" className="text-sm text-center">
              We found an invalid code, please try again
            </Copy>
          </Banner.Error>
        </Show>
        <OneTimePasswordDisplay
          onSubmit={submitLoginCode}
          isSubmitting={validateLoginCode.isLoading}
        />
        <Button.Secondary onPressIn={() => navigation.navigate("Login")}>
          <Copy color="midnight">Cancel</Copy>
        </Button.Secondary>
      </Flex.Column>
    </Flex>
  );
};

export default OneTimePasswordScreen;
