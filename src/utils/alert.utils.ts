import { Alert } from "react-native"

interface IAlertMessage {
    title: string;
    message: string;
    buttonText: string;
    handleContinue?(): void;
    style?: "default" | "cancel" | 'destructive'
}
export const alertMessage = ({ title, message, style = "default", handleContinue, buttonText }: IAlertMessage) => {
    Alert.alert(title, message ?? 'Something went wrong', [
        {
            text: buttonText,
            onPress: () => handleContinue?.(),
            style
        }
    ])
}