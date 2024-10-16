import { Text } from "react-native"

interface IPostDescription {
  username: string;
  content: string;
}

export const PostDescription = ({ username, content }: IPostDescription) => {
  return (
    <Text>
      <Text style={{
        fontWeight: 800
      }}>
        {username}
      </Text>{" "}
      <Text>
        {content}
      </Text>
    </Text>
  )
}