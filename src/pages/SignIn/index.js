import React, {useRef, useState} from 'react';
import {Image} from 'react-native';
import Logo from '../../assets/logo.png';
import Background from '../../components/Background';
import {useDispatch} from 'react-redux';
import {signInRequest} from '../../store/modules/auth/actions';
import {
  Container,
  Form,
  SignLink,
  SignLinkText,
  SubmitButton,
  FormInput,
} from './styles';

export default function SignIn({navigation}) {
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function handleSubmit() {
    console.tron.log(email, password);

    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={Logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Digite seu Email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            ref={passwordRef}
            placeholder="Sua senha secreta"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>
        <SignLink
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <SignLinkText>Criar Conta Gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
