import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image} from 'react-native';
import Logo from '../../assets/logo.png';
import Background from '../../components/Background';
import {
  Container,
  Form,
  SignLink,
  SignLinkText,
  SubmitButton,
  FormInput,
} from './styles';
import {signUpRequest} from '../../store/modules/auth/actions';

export default function SignIn({navigation}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={Logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Nome Completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCaptalize="none"
            returnKeyType="next"
            placeholder="Digite seu Email"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="submit"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Cadastrar</SubmitButton>
        </Form>
        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <SignLinkText>Já tenho Conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
