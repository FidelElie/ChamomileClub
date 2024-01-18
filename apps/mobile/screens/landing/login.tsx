import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";

import { StartAuthProcessInterfaces } from "@thechamomileclub/api";
import { Banner, Button, Copy, Flex, Heading, Show, TextField, TextFieldRef } from "@thechamomileclub/ui";

import { useStartAuthProcess } from "@/library/queries";
import { LandingStackNavigationProps } from "./_types";

type SubmissionErrors =
  | null
  | StartAuthProcessInterfaces["404"]
  | StartAuthProcessInterfaces["422"];

const LoginScreen = () => {
  const inputRef = useRef<TextFieldRef>(null);

  const navigation = useNavigation<LandingStackNavigationProps>();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<SubmissionErrors>(null);

  const startAuthProcess = useStartAuthProcess();

  const validSubmission = StartAuthProcessInterfaces.body.safeParse({ email });

  const handleSubmission = async () => {
    setError(null);
    try {
      const response = await startAuthProcess.mutateAsync({
        email: email.toLowerCase(),
      });

      navigation.navigate("OTP", { keyId: response.keyId });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }

      // FIXME not sure why this is error.response
      // const { data } = error.response;
      // setError(data);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Flex className="flex-grow justify-center">
      <Flex className="justify-center mb-6">
        <Heading className="text-center mb-5">Email Address</Heading>
        <TextField
          ref={inputRef}
          placeholder="ENTER HERE"
          textAlign="center"
          keyboardType="email-address"
          value={email.toUpperCase()}
          autoComplete="email"
          onChangeText={(text) => setEmail(text)}
        />
        <Show if={error}>
          {(error) => (
            <Banner.Error className="mt-2">
              <Copy
                color="midnight-100"
                className="text-center text-sm opacity-90"
              >
                {error.status === 404 && "We Couldn't find your account"}
              </Copy>
            </Banner.Error>
          )}
        </Show>
      </Flex>
      <Flex className="space-y-3">
        <Button.Primary
          disabled={!validSubmission.success}
          onPressIn={handleSubmission}
        >
          <Copy>Continue</Copy>
        </Button.Primary>
        <Button.Secondary onPressIn={() => navigation.navigate("Landing")}>
          <Copy color="green">Back</Copy>
        </Button.Secondary>
      </Flex>
    </Flex>
  );
};

export default LoginScreen;
