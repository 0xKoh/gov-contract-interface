'use client'
import React from 'react'
import { Button, Input, HStack, Text, FormErrorMessage } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useSignTypedData, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

const ExeButton = () => {

  interface argType {
    id: string,
    name: string,
    content: string,
  }

  let sig = ''

  const { address, isConnected }: any = useAccount()
  const [ arg, setArg ] = React.useState<argType>({
    id: '',
    name: '',
    content: '',
  })

  interface inputType {
    name: string,
    type: string,
    key: number,
    size: number,
    isInvalid: boolean,
    value: string|number,
  }

  const inputs: Array<inputType> = [
    { name: "id", type: "number", value: "", key: 1, size: 15, isInvalid: false },
    { name: "name", type: "text", value: "", key: 2, size: 15, isInvalid: false },
    { name: "content", type: "text", value: "", key: 3, size: 17, isInvalid: false }
  ]

  // Generate signature of a proposing.
  const domain = {
    name: "governance",
    version: "1.0.0",
    chainId: 5,
    verifyingContract: "0xc118db1b7ba61eb829c54686ba12ccb08f30d777"
  } as const 

  const types = {
    propose: [
      { name: "id", type: "uint256" },
      { name: "sender", type: "address" },
      { name: "content", type: "string" }
    ],
    vote: [
      { name: "id", type: "uint256" },
      { name: "sender", type: "address" },
      { name: "content", type: "string" }
    ]
  } as const

  const message = {
      id: BigInt(arg.id),
      sender: address,
      content: arg.content
  } as const

  // Execute the propose function of gov contract.
  const ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_version","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ECDSAInvalidSignature","type":"error"},{"inputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"name":"ECDSAInvalidSignatureLength","type":"error"},{"inputs":[{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"ECDSAInvalidSignatureS","type":"error"},{"inputs":[],"name":"InvalidShortString","type":"error"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"StringTooLong","type":"error"},{"anonymous":false,"inputs":[],"name":"EIP712DomainChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_proposer","type":"address"},{"indexed":false,"internalType":"string","name":"_name","type":"string"},{"indexed":false,"internalType":"string","name":"_content","type":"string"}],"name":"Proposing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_voter","type":"address"},{"indexed":true,"internalType":"uint256","name":"_id","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_approval","type":"bool"}],"name":"Voting","type":"event"},{"inputs":[],"name":"eip712Domain","outputs":[{"internalType":"bytes1","name":"fields","type":"bytes1"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"verifyingContract","type":"address"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256[]","name":"extensions","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getApproval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getPopulation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getProposal","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"proposer","type":"address"},{"internalType":"bool","name":"isProposed","type":"bool"},{"internalType":"uint256","name":"population","type":"uint256"},{"internalType":"uint256","name":"approval","type":"uint256"}],"internalType":"struct Governance.proposal","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_msgSender","type":"address"}],"name":"isVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"proposer","type":"address"},{"internalType":"bool","name":"isProposed","type":"bool"},{"internalType":"uint256","name":"population","type":"uint256"},{"internalType":"uint256","name":"approval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_sender","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contents","type":"string"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"proposing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_sender","type":"address"},{"internalType":"string","name":"_contents","type":"string"},{"internalType":"bool","name":"_approval","type":"bool"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const { data, signTypedDataAsync } = useSignTypedData({ 
    domain, 
    types, 
    message, 
    primaryType: "propose", 
  })

  const { config, error } = usePrepareContractWrite({
    address: '0xE4955CDf0939Ea37A460aB579527562782Ae0554',
    abi: ABI,
    functionName: 'proposing',
    chainId: 5,
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
    args: [BigInt(arg.id), address, arg.name, arg.content, data]
  })

  const { writeAsync, isLoading, isSuccess } = useContractWrite(config)

  async function sendTransaction():Promise<void> {
    sig = await signTypedDataAsync()
    console.log(sig)
    const receipt = await writeAsync?.()
    console.log(receipt)
  }

  if(!isConnected) return(
    <HStack>
      <Text>Please connect your Ethereum wallet.</Text>
    </HStack>
  )

  return (
      <Formik 
        initialValues={{id: '', name: '', content: ''}} 
        onSubmit={(values) => {
          setArg({id: values.id, name: values.name, content: values.content})
          sendTransaction()
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <Text p={2}>Propose</Text>
                {inputs.map((e) => 
                    <Input 
                      key={e.key}
                      name={e.name}
                      isInvalid={e.isInvalid}
                      htmlSize={e.size}
                      width="full"
                      placeholder={e.name}
                      type={e.type}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                )}
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <Button
              disabled={!isConnected}
              mt={4}
              isLoading={isLoading}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
  )}

export default ExeButton