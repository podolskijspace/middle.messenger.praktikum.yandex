import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTP from "./index";
import { expect } from "chai";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance = HTTP;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  it(".get() должен отправлять get запрос", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });

  it(".post() должен отправлять post запрос", () => {
    instance.post("/signin");

    const [request] = requests;

    expect(request.method).to.eq("POST");
  });
});
