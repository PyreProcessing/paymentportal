'use client';
import React from 'react';
import styles from './Services.module.scss';
import formStyles from '@/styles/Form.module.scss';
import Error from '@/components/error/Error.component';
import useFetchData from '@/state/actions/useFetchData';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  message,
} from 'antd';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import UserType from '@/types/UserType';
import formatCardNumber from '@/utils/formatCardNumber';
import states from '@/data/states';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import usePostData from '@/state/actions/usePostData';
import TitleContainer from '@/components/titleContainer/TitleContainer.UI';
import { encryptData } from '@/utils/encryptData';
import decryptData from '@/utils/decryptData';
import { useMerchantStore } from '@/state/merchant';
import { useSearchParams } from 'next/navigation';
import currencyFormatter from '@/utils/currencyFormatter';

const Services = () => {
  const router = useRouter();
  const query = useSearchParams();
  // get the slug from the url
  const { slug, paymentProcessor } = useParams();
  // pull out query params
  const disableForm = query.get('disableForm') === 'true';
  // pull out the amount, webhookuri and redirecturi from the query params
  const amount = query.get('amount');
  const webhookUri = query.get('webhookuri');
  const redirectUri = query.get('redirecturi');

  const { mutate: fireWebhook } = usePostData({
    url: `${webhookUri}`,
    key: `webhook-${webhookUri}`,
  });
  const [form] = Form.useForm();
  const [agree, setAgree] = React.useState(false);
  const [successfulTransaction, setSuccessfulTransaction] =
    React.useState(false);
  const { merchant, setMerchant } = useMerchantStore();

  // fetch information for the merchant with the slug
  const { data, isLoading, isError, error } = useFetchData({
    url: `/merchant/services/${slug}`,
    key: `merchant-services-${slug}`,
  });

  const { mutate: submitPayment, isPending: paymentProcessing } = usePostData({
    url: `/transaction/${slug}/service`,
    key: `submit-payment-${slug}`,
    successMessage: `Your payment has been submitted successfully for ${slug}!`,
  });

  const onFinish = () => {
    // validate the form, if it is not valid, return
    form.validateFields().then(async () => {
      if (!agree) {
        message.error('You must agree to the terms and conditions to continue');
        return;
      }
      // if the form is valid, submit the payment
      submitPayment(
        {
          data: encryptData(JSON.stringify(form.getFieldsValue())),
        },
        {
          onSuccess: (data) => {
            // if there is a webhook uri and redirect uri, fire the webhook and redirect to the redirect uri, after successful payment
            if (webhookUri && redirectUri) {
              fireWebhook(
                {
                  data: JSON.stringify(data),
                },
                {
                  onSuccess: () => {
                    window.location.href = redirectUri;
                  },
                }
              );
            }
            // if there is only a redirect uri, redirect to the redirect uri, after successful payment
            else if (redirectUri) {
              window.location.href = redirectUri;
            } else {
              setSuccessfulTransaction(true);
            }
          },
        }
      );
    });
  };
  React.useEffect(() => {
    if (data?.payload) {
      setMerchant(data.payload);
    }
  }, [data?.payload]);

  React.useEffect(() => {
    if (amount) {
      form.setFieldsValue({
        paymentInfo: { amount: amount },
      });
    }
  }, [amount]);

  if (isLoading || paymentProcessing)
    return <Skeleton active paragraph={{ rows: 4 }} />;
  if (isError) return <Error error={error} />;

  if (successfulTransaction)
    return (
      <TitleContainer
        title="Payment Successful"
        subtitle="The payment was processed successfully an email receipt will be sent to you!"
        styles={styles.titleContainer}
      />
    );

  if (!merchant)
    return (
      <TitleContainer
        title="Merchant Not Found"
        subtitle="The merchant you are looking for does not exist"
      />
    );
  return (
    <div className={styles.container}>
      {merchant?.status !== 'active' && (
        <div className={styles.inactiveContainer}>
          <TitleContainer
            title="Processing in Progress"
            subtitle="We're still working on processing this merchant. Please check back later!"
            styles={styles.titleContainer}
          />
        </div>
      )}
      <div className={styles.businessContainer}>
        <div className={styles.logoContainer}>
          <Image
            src={
              merchant?.businessInfo?.logoUrl
                ? merchant?.businessInfo.logoUrl
                : merchant?.businessLogoUrl
            }
            alt={
              merchant?.businessInfo?.name
                ? merchant?.businessInfo.name + '-logo'
                : merchant?.businessName + '-logo'
            }
            width={500}
            height={250}
          />
        </div>
        <div className={styles.businessDescription}>
          <h1>{merchant?.businessInfo?.name}</h1>
          <p>{merchant?.businessInfo?.missionStatement}</p>
          <p className={styles.subText}>
            By utilizing our payment for services platform, you acknowledge and
            agree that the amount specified by you in the provided form shall be
            charged to your designated credit card. Your submission of credit
            card information constitutes authorization for the specified
            transaction. This action signifies your acceptance of the obligation
            to remit the chosen amount to the merchant in exchange for the
            services rendered. Your engagement with our platform is subject to
            our terms and conditions. Thank you for your patronage.
          </p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Form
          layout="vertical"
          form={form}
          className={formStyles.form}
          disabled={merchant?.status !== 'active' || disableForm}
          initialValues={{
            billing: {
              country: 'US',
              state: 'AL',
              // zipcode: '23444',
              // address: '1234 Main St',
              // city: 'Birmingham',
              // firstName: 'John',
              // lastName: 'Doe',
            },
            userInfo: {
              // email: 'test@test.com',
              // phoneNumber: '(123)-456-7890',
            },
            paymentInfo: {
              // amount: 100.0,
              nameOnCard: 'John Doe',
              cardNumber: '5204 9102 1148 2784',
              expirationDate: '12/23',
              cvv: '123',
            },
          }}
        >
          <Divider orientation="center">Amount</Divider>
          <div className={formStyles.form__formContainer}>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Amount"
                  name={['paymentInfo', 'amount']}
                  className={formStyles.form__label}
                  rules={[
                    { required: true, message: 'Please enter the amount' },
                  ]}
                >
                  <InputNumber
                    value={form.getFieldValue('paymentInfo.amount')}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                    style={{ width: '100%' }}
                    // ensure that the amount cannot be changed if the amount is passed in as a query param
                    disabled={!!amount}
                  />
                </Form.Item>
              </div>
            </div>
            {!amount &&
              merchant.servicePageOptions?.predeterminedAmounts &&
              merchant.servicePageOptions?.predeterminedAmounts?.length > 0 && (
                <div className={styles.predeterminedAmounts}>
                  <h3>Choose a predetermined amount</h3>
                  <div className={styles.amounts}>
                    {merchant.servicePageOptions?.predeterminedAmounts?.map(
                      (amount: string) => (
                        <Button
                          key={amount}
                          onClick={() => {
                            form.setFieldsValue({
                              paymentInfo: { amount: amount },
                            });
                          }}
                        >
                          {currencyFormatter(amount)}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              )}
            <Divider orientation="center">Customer Information</Divider>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Email"
                  name={['userInfo', 'email']}
                  className={formStyles.form__label}
                  rules={[
                    {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    },
                    {
                      required: true,
                      message: 'Please enter your email',
                    },
                  ]}
                >
                  <Input placeholder="youremail@example.com" />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  name={['userInfo', 'phoneNumber']}
                  label="Phone Number"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="123-456-7890"
                    // format the phone number as the user types it
                    onChange={(e) => {
                      form.setFieldsValue({
                        userInfo: {
                          phoneNumber: formatPhoneNumber(e.target.value),
                        },
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <Divider orientation="center">Payment Information</Divider>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Name on Card"
                  name={['paymentInfo', 'nameOnCard']}
                  className={formStyles.form__label}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the name on the card',
                    },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
              </div>
            </div>

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Card Number"
                  name={['paymentInfo', 'cardNumber']}
                  className={formStyles.form__label}
                  rules={[
                    { required: true, message: 'Please enter a card number' },
                  ]}
                  // ensure that the card number is formatted as the user types it
                  // and has a space after every 4 characters
                  // and is of a certain length
                >
                  <Input
                    placeholder="1234 5678 9101 1121"
                    onChange={(e) =>
                      form.setFieldsValue({
                        paymentInfo: {
                          cardNumber: formatCardNumber(e.target.value),
                        },
                      })
                    }
                  />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Expiration Date"
                  name={['paymentInfo', 'expirationDate']}
                  className={formStyles.form__label}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the expiration date',
                    },
                  ]}
                >
                  <Input placeholder="MM/YY" />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="CVV"
                  name={['paymentInfo', 'cvv']}
                  className={formStyles.form__label}
                  rules={[{ required: true, message: 'Please enter the CVV' }]}
                >
                  <Input placeholder="123" />
                </Form.Item>
              </div>
            </div>
            <Divider orientation="center">Billing Information</Divider>

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="First Name"
                  name={['billing', 'firstName']}
                  className={formStyles.form__label}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a name for the order',
                    },
                  ]}
                >
                  <Input
                    value={form.getFieldsValue().firstName}
                    placeholder="John"
                  />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Last Name"
                  name={['billing', 'lastName']}
                  className={formStyles.form__label}
                >
                  <Input
                    value={form.getFieldsValue().firstName}
                    placeholder="Doe"
                  />
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Company Name"
                  name={['billing', 'company']}
                  className={formStyles.form__label}
                >
                  <Input
                    value={form.getFieldsValue().company}
                    className={formStyles.form__select}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Address"
                  name={['billing', 'address']}
                  className={formStyles.form__label}
                  rules={[
                    { required: true, message: 'Please enter an address' },
                  ]}
                >
                  <Input value={form.getFieldsValue().address} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="City"
                  name={['billing', 'city']}
                  className={formStyles.form__label}
                  rules={[
                    { required: true, message: 'Please enter a city location' },
                  ]}
                >
                  <Input value={form.getFieldsValue().firstName} />
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Country"
                  name={['billing', 'country']}
                  className={formStyles.form__label}
                >
                  <Input value={'US'} readOnly />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="State"
                  name={['billing', 'state']}
                  className={formStyles.form__label}
                >
                  <Select
                    value={form.getFieldsValue().state}
                    className={formStyles.form__select}
                    options={states.map((state) => {
                      return {
                        label: state.name,
                        value: `${state.abbreviation}`,
                      };
                    })}
                    showSearch
                  />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Zip Code"
                  name={['billing', 'zipcode']}
                  className={formStyles.form__label}
                >
                  <Input value={form.getFieldsValue().zipcode} />
                </Form.Item>
              </div>
            </div>

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Checkbox
                  checked={agree}
                  onChange={() => {
                    setAgree(!agree);
                  }}
                  required
                >
                  Accept
                </Checkbox>
                &quot;By clicking &apos;Accept&apos;, you authorize Pyre
                Mountain Processing to securely collect and process the personal
                information provided, including but not limited to credit card
                details, billing/shipping information, name, email, and phone
                number, for the purpose of completing the transaction. You
                understand and agree that Pyre Mountain Processing will transmit
                the provided data securely to a third-party payment processor
                for payment processing purposes. You acknowledge that Pyre
                Mountain Processing will retain only the necessary information
                for record-keeping purposes, including billing/shipping details
                and the last 4 digits of the credit card used. You further
                consent to Pyre Mountain Processing&apos;s adherence to
                applicable data protection laws and regulations, including but
                not limited to the General Data Protection Regulation (GDPR) and
                the Payment Card Industry Data Security Standard (PCI DSS). For
                more information on how Pyre Mountain Processing handles your
                personal data, please refer to our Privacy Policy.&quot;
              </div>
            </div>
            <div className={formStyles.form__buttonContainer}>
              <Button
                type="primary"
                htmlType="submit"
                className={formStyles.form__button}
                onClick={() => {
                  onFinish();
                }}
              >
                Submit Payment
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Services;
