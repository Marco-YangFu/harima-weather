import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Index() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>It works.（まずは空っぽ）</Text>
            <Link href="/weather" asChild>
                <Button title="Go to Weather" />
            </Link>
        </View>
    )
}