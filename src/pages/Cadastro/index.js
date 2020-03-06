import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { IoMdMicrophone, IoMdHeadset } from 'react-icons/io';
import { signUpRequest } from '../../store/modules/auth/actions';
import Input from '../../components/Input';

import { cpfMask } from '../../utils/Mask'
import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col
} from 'reactstrap';

export default function Cadastro() {
	const formRef = useRef(null);
	const dispatch = useDispatch();

	const [tusId, setTusId] = useState('');
	const [buttonPodCaster, setButtonPodCaster] = useState('');
	const [buttonOuvinte, setButtonOuvinte] = useState('');
	const [errorProvider, setErrorProvider] = useState('');

	const [cpfMaskValue, setValueMask] = useState('');
	
	async function handleSubmit({ nome, senha, email, cpf }) {
		try{
			
			const schema = Yup.object().shape({
				nome: Yup.string().required("O nome é obrigatorio"),
				email: Yup.string().email("Digite um email valido").required("O email é obrigatorio"),
				senha: Yup.string().required("A senha é obrigatorio").min(6, "Minimo de 6 caracteres"),
				cpf: Yup.string().required("O cpf é obrigatorio"),
			});

	
			await schema.validate({ nome, senha, email, cpf },{
				abortEarly: false,
			});

			if (tusId != '') {
				dispatch(signUpRequest(nome, senha, email, cpf, tusId));
			}else{
				setErrorProvider("Selecione entre Ouvinte ou Podcaster!")
			}
			formRef.current.setErrors(false);

		}catch (err){
			if( err instanceof Yup.ValidationError){
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				console.log(errorMessages)

				formRef.current.setErrors(errorMessages);
			}
		}	
	}


	function setProfile(id) {
		if(id === 1){
			setButtonPodCaster('')
			setButtonOuvinte('buttonActive')
		}else{
			setButtonOuvinte('')
			setButtonPodCaster('buttonActive')
		}
		setErrorProvider("")
		setTusId(id);	
	}

	function setMaskCPF(e){
		setValueMask(cpfMask(e.target.value))
	
	}



	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="5">
							<Card className="bg-secondary shadow border-0">
								<CardBody className="px-lg-5 py-lg-5">
									<Form ref={formRef} onSubmit={handleSubmit}>
										<Row lg="12" className="mb-3">
											<Col xs="6">
												<Button
													style={{
														width: '100%',
														height: '100%',
														background: '#232659',
														border: 'none',
														padding: '10px 0 10px 0',
														color: '#1BFDBE'
													}}
													className={buttonOuvinte}
													onClick={e => setProfile(1)}
												>
													<IoMdHeadset size={40} />
													<p className="mt-2">Ouvinte</p>
												</Button>
											</Col>
											<Col xs="6">
												<Button
												
													style={{
														width: '100%',
														height: '100%',
														background: '#232669',
														border: 'none',
														padding: '10px 0 10px 0',
														color: '#1BFDBE'
													}}
													className={buttonPodCaster}
													onClick={e => setProfile(2)}
												>
													<IoMdMicrophone size={40} />
													<p className={"mt-2"}>Podcaster</p>
												</Button>
											</Col>
											<Col xs="12 mt-2">
												<p className="text-center" style={{color:"red"}}>{ errorProvider !== '' ? errorProvider: " " }</p>
											</Col>
												
										</Row>

										<Input
											name="nome"
											type="text"
											placeholder="Nome"
										/>
										<Input
											name="email"
											type="email"
											placeholder="Seu e-mail"
										/>
										<Input
											name="senha"
											type="password"
											placeholder="Sua senha "
										/>
										<Input
											name="cpf"
											type="text"
											placeholder="CPF"
											value={cpfMaskValue}
											onChange={setMaskCPF}
										/>
										{/* <Input className="has-success form-control" name="tipoUser" type="text" placeholder="teste tus_id"/>*/}

										<div className="text-center">
											<Button type="submit" className="my-2" color="primary">
												Cadastrar
											</Button>
										</div>
									</Form>
									<Row className="mt-1">
										<Col xs="6">
											<a
												className="text-light"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<small>Esqueci a senha</small>
											</a>
										</Col>
										<Col className="text-right" xs="6">
											<a
												className="text-light"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<small>Criar nova conta</small>
											</a>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
