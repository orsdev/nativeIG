import { ThemeColor } from "@/constants";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PostHeader } from "./PostHeader";
import { PostDescription } from "./PostDesc";
import { PostComment } from "./PostComment";
import { PostImage } from "./PostImage";
import { IPost } from "@/interfaces/post.interface";
import { useState } from "react";
interface IPostContent {
    post: IPost
};

export const PostContent = ({ post }: IPostContent) => {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(state => !state)
    }

    return (
        <View style={styles.root}>
            <PostHeader imageUri={post?.images?.[0]} />
            <PostImage
                images={post?.images}
                handleClick={toggleLike}
            />

            <View style={styles.footer}>
                <View style={styles.container}>
                    <Pressable onPress={toggleLike}>
                        <AntDesign
                            name={isLiked ? 'heart' : 'hearto'} size={24}
                            style={styles.icon}
                            color={isLiked ? ThemeColor.accent : ThemeColor.black} />
                    </Pressable>
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
                    <Text style={[styles.bold]}>{post.nofLikes} others</Text>
                </Text>
                <PostDescription
                    username={post.user?.username}
                    content={post?.description} />

                {/* Total comments Button */}
                <Pressable>
                    <Text style={{
                        color: ThemeColor.grey,
                        marginTop: 5
                    }}>{`View all ${post.nofComments} comments`}</Text>
                </Pressable>

                {/* Comment */}
                {post.comments?.map(comment => (
                    <PostComment
                        key={comment.id}
                        username={comment.user.username}
                        date="Sept 24, 2002"
                        comment={comment.comment} />
                ))}
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