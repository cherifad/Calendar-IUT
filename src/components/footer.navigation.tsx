import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";


export default function footerNavigation() {
    const {colors} = useTheme();
    return (
        <View className="flex-row justify-between">
            <View className="flex-row">
                <Pressable>
                    <Text style={{color: colors.text}} className="text-base">Home</Text>
                </Pressable>
            </View>
            <View className="flex-row">
                <Pressable>
                    <Text style={{color: colors.text}} className="text-base">Settings</Text>
                </Pressable>
            </View>
        </View>
    )
}
