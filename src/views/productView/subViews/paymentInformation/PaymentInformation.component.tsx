import React from "react";
import { Checkbox, Divider, Form, Input, InputNumber, Select } from "antd";
import styles from "./index.module.scss";
import formStyles from "@/styles/Form.module.scss";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { countries } from "@/data/countries";
import CartList from "@/components/cartList/CartList.component";
import { useCartStore } from "@/state/cart";
import states from "@/data/states";
import formatCardNumber from "@/utils/formatCardNumber";

const PaymentInformation = () => {
  const [form] = Form.useForm();

  const { setCurrentForm, paymentInformationValues, userInformationValues, billingInformationValues } = useCartStore();

  React.useEffect(() => {
    form.setFieldsValue({
      userInfo: userInformationValues,
      paymentInfo: paymentInformationValues,
      billing: billingInformationValues,
    });
    setCurrentForm(form);
  }, []);
 
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          layout="vertical"
          className={formStyles.form}
          form={form}
          initialValues={{
            // set the default country to United States, in the billing object
            billing: {
              country: "US",
              state: "AL",
              zipcode: "23444",
              address: "1234 Main St",
              city: "Birmingham",
              firstName: "John",
              lastName: "Doe",
            },
            userInfo: {
              email: "test@test.com",
              phoneNumber: "123-456-7890",
            },
            paymentInfo: {
              nameOnCard: "John Doe",
              cardNumber: "5204 9102 1148 2784",
              expirationDate: "12/23",
              cvv: "123",
            },
          }}
        >
          <Divider orientation="center">Customer Information</Divider>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Email"
                name={["userInfo", "email"]}
                className={formStyles.form__label}
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input placeholder="youremail@example.com" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={["userInfo", "phoneNumber"]}
                label="Phone Number"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="123-456-7890"
                  // format the phone number as the user types it
                  onChange={(e) => {
                    form.setFieldsValue({ userInfo: { phoneNumber: formatPhoneNumber(e.target.value) } });
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
                name={["paymentInfo", "nameOnCard"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter the name on the card" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
            </div>
          </div>

          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Card Number"
                name={["paymentInfo", "cardNumber"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter a card number" }]}
                // ensure that the card number is formatted as the user types it
                // and has a space after every 4 characters
                // and is of a certain length
              >
                <Input
                  placeholder="1234 5678 9101 1121"
                  onChange={(e) =>
                    form.setFieldsValue({ paymentInfo: { cardNumber: formatCardNumber(e.target.value) } })
                  }
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Expiration Date"
                name={["paymentInfo", "expirationDate"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter the expiration date" }]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="CVV"
                name={["paymentInfo", "cvv"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter the CVV" }]}
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
                name={["billing", "firstName"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter a name for the order" }]}
              >
                <Input value={form.getFieldsValue().firstName} placeholder="John" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Last Name" name={["billing", "lastName"]} className={formStyles.form__label}>
                <Input value={form.getFieldsValue().firstName} placeholder="Doe" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Company Name" name={["billing", "company"]} className={formStyles.form__label}>
                <Input value={form.getFieldsValue().company} className={formStyles.form__select} />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Address"
                name={["billing", "address"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter an address" }]}
              >
                <Input value={form.getFieldsValue().address} />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="City"
                name={["billing", "city"]}
                className={formStyles.form__label}
                rules={[{ required: true, message: "Please enter a city location" }]}
              >
                <Input value={form.getFieldsValue().firstName} />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Country" name={["billing", "country"]} className={formStyles.form__label}>
                <Input value={"US"} readOnly />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="State" name={["billing", "state"]} className={formStyles.form__label}>
                <Select
                  value={form.getFieldsValue().state}
                  className={formStyles.form__select}
                  options={states.map((state) => {
                    return { label: state.name, value: `${state.abbreviation}` };
                  })}
                  showSearch
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Zip Code" name={["billing", "zipcode"]} className={formStyles.form__label}>
                <Input value={form.getFieldsValue().zipcode} />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Special Instructions" name={["userInfo", "special"]} className={formStyles.form__label}>
                <Input.TextArea
                  value={form.getFieldsValue().special}
                  placeholder="Add any special instructions for the order"
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item name={["userInfo", "sameAsShipping"]} valuePropName="checked" noStyle>
                <Checkbox>Shipping address, Same as billing?</Checkbox>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className={styles.cartContainer}>
        <CartList />
      </div>
    </div>
  );
};

export default PaymentInformation;
