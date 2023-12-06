import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, CHAT_API} from '../../config/urls';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import socketServices from '../../utils/socketService';
import {launchImageLibrary} from 'react-native-image-picker';

const ChatItem = ({navigation, route}) => {
  const {_id, name, avatar} = route.params;
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();

  const getApi = async () => {
    try {
      const res = await apiGet(`${CHAT_API}/getMessages/${_id}`);
      const data = res?.message;
      const formattedMessages = data?.messagers.map(message => ({
        ...message,
        user: {
          _id: message?.senderId,
          name: message?.senderId === userId ? name : 'Me',
          avatar: `${API_BASE_URL}${avatar}`,
        },
      }));
      setUserId(data?.userId);
      setMessages(formattedMessages.reverse());
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});

      if (!result.cancelled) {
        const imageMessage = {
          _id: Math.round(Math.random() * 1000000),
          image: result.assets[0].uri,
          createdAt: new Date(),
          user: {
            _id: userId,
          },
        };

        onSend([imageMessage]);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const onSend = newMessages => {
    console.log(newMessages);
    socketServices.emit('chat message', {
      senderId: userId,
      message: newMessages[0].text,
      conversationId: _id,
    });
  };

  useEffect(() => {
    getApi();
    socketServices.emit('joinRoom', _id);
    socketServices.on('send message', msg => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          ...msg,
          user: {
            _id: msg?.senderId,
            name: msg?.senderId === userId ? 'Me' : name,
            avatar: `${API_BASE_URL}${avatar}`,
          },
        }),
      );
    });
  }, []);

  return (
    <View style={MessageItemStyles.container}>
      <View style={MessageItemStyles.header}>
        <TouchableOpacity
          onPress={() => {
            socketServices.emit('leaveRoom', _id), navigation.goBack();
          }}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderRadius: 15,
          }}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <View style={MessageItemStyles.userInfo}>
          <Image
            source={{uri: `${API_BASE_URL}${avatar}`}}
            style={MessageItemStyles.userAvatar}
          />
          <Text style={MessageItemStyles.userName}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="questioncircleo" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        placeholder="Nhập tin nhắn..."
        user={{
          _id: userId,
        }}
        textInputStyle={MessageItemStyles.input}
        renderSend={props => (
          <Send {...props} containerStyle={{justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => props.onSend({text: props.text.trim()}, true)}
              style={MessageItemStyles.sendButton}>
              <MaterialIcons name="send" size={25} color={'white'} />
            </TouchableOpacity>
          </Send>
        )}
        isLoadingEarlier
        renderActions={() => (
          <TouchableOpacity
            onPress={openImagePicker}
            style={{alignSelf: 'center', marginLeft: '3%'}}>
            <Feather name="camera" size={25} color="#333" />
          </TouchableOpacity>
        )}
        renderMessageImage={props => (
          <Image
            source={{uri: props.currentMessage.image}}
            style={{width: 200, height: 150}}
          />
        )}
      />
    </View>
  );
};

const MessageItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    justifyContent: 'space-between',
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    right: '15%',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: '2%',
    backgroundColor: '#19B9EC',
  },
});

export default ChatItem;