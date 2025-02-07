import { Alert, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <Result
      status="error"
      title="Oops! Something went wrong"
      subTitle="An unexpected error occurred."
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Alert type="error" message={message} />
      </div>
    </Result>
  );
};

export default ErrorMessage;
