import LottieView from "lottie-react-native";
import { Container, LoadingText } from "./styles";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../../services/firebaseConfig'
import { useNavigation } from "@react-navigation/native";

export function SplashScreen() {
    const navigate = useNavigation()

    useEffect(() => {
        onAuthStateChanged(auth, {
            next: (user) => {
                setTimeout(() => {
                    if (user) {
                        navigate.replace("BottomTabsNavigation")
                    }
                    else {
                        navigate.replace("SignIn")
                    }
                }, 5000)
            }
        })
    }, [])

    return (
        <Container>
            <LottieView 
                source={require("../../../assets/splash_screen.json")}
                autoPlay
                loop
                style={{ width: 400, height: 400 }}
            />

            <LoadingText>
                Carregando...
            </LoadingText>
        </Container>
    )
}
