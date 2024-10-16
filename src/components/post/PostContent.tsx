import { ThemeColor } from "@/constants";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostHeader } from "./PostHeader";
import { PostDescription } from "./PostDesc";
import { PostComment } from "./PostComment";
import { PostImage } from "./PostImage";

interface IPostContent {
    image: string;
};

export const PostContent = ({ image }: IPostContent) => {
    const isLiked = false;

    return (
        <View style={styles.root}>
            <PostHeader imageUri={image} />
            <PostImage image={image} />
            <View style={styles.footer}>
                <View style={styles.container}>
                    <AntDesign name={isLiked ? 'heart' : 'hearto'} size={24} style={styles.icon} color={ThemeColor.black} />
                    <Ionicons name="chatbubble-outline"
                        size={24}
                        style={styles.icon} color={ThemeColor.black} />
                    <Feather
                        name="send"
                        size={24}
                        style={styles.icon}
                        color={ThemeColor.black}
                    />
                    <Feather name="bookmark" size={24}
                        style={{ marginLeft: 'auto' }}
                        color={ThemeColor.black} />
                </View>

                <Text> Liked by {" "}
                    <Text style={[styles.bold]}>gradu</Text>{" "}
                    and {" "}
                    <Text style={[styles.bold]}>66 others</Text>
                </Text>
                <PostDescription
                    username="sogundare"
                    content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt eius quaerat, architecto beatae minima similique culpa atque delectus minus obcaecati praesentium adipisci ut deleniti officiis dolores, accusamus expedita rerum. Temporibus." />

                {/* Comment */}
                <PostComment
                    username="sogundare"
                    date="Sept 24, 2002"
                    totalComments={25}
                    comment="Lorem ipsum, dolor sit amet consecteture adipisicing elite."
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    root: {},
    pressableIcon: {
        marginLeft: 'auto'
    },
    icon: {
        marginHorizontal: 5
    },
    container: {
        flexDirection: 'row',
        marginBottom: 5

    },
    footer: {
        padding: 10,
    },
    bold: {
        fontWeight: 800
    },
})