import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

// 👩‍⚕️ Nurse Screens
import VaccineNurse from "../pages/Nurse/Vaccine/VaccineNurse";
import MedicalNurse from "../pages/Nurse/Medical/MedicalNurse";

// 🧑‍🎓 Student Screens
import Profile from "../pages/Student/Profile/Profile";
import HealthProfile from "../pages/Student/HealthProfile/HealthProfile";

// 👨‍💼 Manager, 👨‍👩‍👧‍👦 Parent, 🧑‍🎓 Student Screens
// import ManagerMain from "../pages/Manager/ManagerMain"; // Tạo file này
// import ParentMain from "../pages/Parent/ParentMain";   // Tạo file này
// import StudentMain from "../pages/Student/StudentMain"; // Tạo file này

// 🔐 Login screen
import Login from "../pages/Login/Login";
import StudentList from "../pages/Nurse/Vaccine/StudentList";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🩺 Tabs cho role NURSE
const NurseTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Vaccine")
          return <MaterialIcons name="vaccines" size={size} color={color} />;
        else if (route.name === "Medical")
          return <Ionicons name="heart" size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Vaccine" component={VaccineNurse} />
    <Tab.Screen name="Medical" component={MedicalNurse} />
  </Tab.Navigator>
);

// 🩺 Tabs cho role Student
const StudentTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Profile")
          return <AntDesign name="profile" size={24} color="black" />;
        else if (route.name === "HealthProfile")
          return (
            <MaterialCommunityIcons name="hospital" size={24} color="black" />
          );
      },
    })}
  >
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="HealthProfile" component={HealthProfile} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  const { user } = useSelector((state) => state.account);
  console.log(user);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Nếu chưa đăng nhập */}
          {!user?.roleID && <Stack.Screen name="Login" component={Login} />}

          {/* Sau khi đăng nhập sẽ điều hướng theo role */}
          {user?.roleID === 3 && (
            <>
              <Stack.Screen name="NurseMain" component={NurseTabs} />
              <Stack.Screen name="NurseStudent" component={StudentList} />
            </>
          )}
          {/* {user?.roleID === 2 && (
            <Stack.Screen name="ManagerMain" component={ManagerMain} />
          )}
          {user?.roleID === 4 && (
            <Stack.Screen name="ParentMain" component={ParentMain} />
          )}
          */}
          {user?.roleID === 5 && (
            <Stack.Screen name="StudentMain" component={StudentTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export { AppNavigation };
