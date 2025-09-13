import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./../../firebaseConfig";
import { useRouter } from "expo-router";

// A simple alert function that works on web and native
const customAlert = (title: string, message: string): void => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const Auth: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded]: [boolean, Error | null] = useFonts({
    "urbanist-Regular": require("./../../assets/fonts/Urbanist-Regular.ttf"),
    "urbanist-Bold": require("./../../assets/fonts/Urbanist-Bold.ttf"),
  });

  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAuth = async () => {
    if (!email || !password) {
      customAlert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignIn) {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        customAlert("Success!", `Welcome back, ${user.email}!`);
        router.push("/(tabs)")
      } else {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        customAlert(
          "Success!",
          `Account created for ${user.email}!\nYou are now signed in.`
        );
      }
      // Clear inputs
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error("Auth Error:", error);

      let errorMessage: string = "An unexpected error occurred.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = error.message;
      }

      customAlert("Authentication Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1 px-6 bg-gray-50">
      <Image
        source={require("./../../assets/images/medicine-login-image.png")}
        resizeMode="cover"
        style={{ width: 120, height: 120, marginBottom: 40 }}
      />

      <Text className="mb-4 text-3xl text-center font-urbanistBold">
        {isSignIn ? "Sign In" : "Sign Up"} to{" "}
        <Text className="text-yellow-500">Medico</Text>
      </Text>

      <Text className="mb-8 text-base text-center text-gray-600">
        {isSignIn
          ? "Enter your details to access your account."
          : "Create a new account to get started."}
      </Text>

      <View className="w-full mb-4">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full p-4 mb-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full p-4 bg-white border border-gray-300 rounded-lg"
          style={{ minHeight: 56 }}
        />
      </View>

      <TouchableOpacity
        onPress={handleAuth}
        disabled={isLoading}
        className="flex-row items-center justify-center w-full p-4 mb-4 bg-blue-500 rounded-lg"
        style={{
          minHeight: 56,
          opacity: isLoading ? 0.6 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="text-base font-semibold text-white">
          {isLoading
            ? isSignIn
              ? "Signing In..."
              : "Creating Account..."
            : isSignIn
            ? "Sign In"
            : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
        <Text className="text-sm text-blue-500 underline">
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>

      <View className="mt-8">
        <Text className="text-xs text-gray-500">
          Powered by Firebase Authentication
        </Text>
      </View>
    </View>
  );
};

export default Auth;
