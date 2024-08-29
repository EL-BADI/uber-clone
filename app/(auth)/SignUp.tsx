import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import Modal from "react-native-modal";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification((prev) => ({ ...prev, state: "pending" }));
    } catch (err: any) {
      setVerification((prev) => ({
        ...prev,
        error: err.errors[0].longMessage,
        state: "faild",
      }));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: create db user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification((prev) => ({ ...prev, state: "success" }));
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        setVerification((prev) => ({
          ...prev,
          error: "Verification faild!",
          state: "faild",
        }));
      }
    } catch (err: any) {
      setVerification((prev) => ({
        ...prev,
        error: err.errors[0].longMessage,
        state: "faild",
      }));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[200px]"
            resizeMode="cover"
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Name"
                placeholder="Enter your name"
                icon={icons.person}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Name is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email"
                placeholder="Enter your E-mail"
                icon={icons.email}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Email is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons.lock}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Password is required.
            </Text>
          )}
          <Button
            title="Sign up"
            onPress={handleSubmit(onSubmit)}
            className=" mt-7"
          />

          <OAuth />
          <Link
            href={"/(auth)/SignIn"}
            className="text-lg  text-center text-general-200 mt-5"
          >
            <Text>Already have an account? </Text>
            <Text className=" text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* verification modal */}
        <Modal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className=" font-JakartaExtraBold mb-2 text-2xl">
              Verification
            </Text>
            <Text className=" font-Jakarta mb-5 ">
              We've sent a verification code to {getValues("email")}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => {
                setVerification((prev) => ({ ...prev, code }));
              }}
            />
            <Button
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 !bg-emerald-500"
            />
          </View>
        </Modal>
        <Modal isVisible={showSuccessModal}>
          <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className=" w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className=" text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className=" text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verfied your account
            </Text>

            <Button
              title="Browse Home"
              className=" mt-5"
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/(root)/(tabs)/Home");
              }}
            ></Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
