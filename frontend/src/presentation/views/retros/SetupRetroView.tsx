import { RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, { FormEventHandler, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useAuthContext } from "../../../core/context/AuthContext";
import useSetupRetroWebsocket from "../../../core/hooks/UseSetupRetroWebsocket";
import Card from "../../components/Card";
import Input from "../../components/Input";
import AppWrapper from "../../wrappers/AppWrapper";

type RetroFormat = {
  id: string;
  name: string;
  description: string;
};

const RetroFormats: Readonly<RetroFormat[]> = [
  {
    id: "start-stop-continue",
    name: "Start, Stop, Continue",
    description:
      "Focus the team on processes and form new team habits by defining what to start, stop and continue doing.",
  },
  {
    id: "glad-sad-mad",
    name: "Glad, Sad, Mad",
    description:
      "Understand your team's emotional health and bring about any necessary change.",
  },
  {
    id: "the-4-ls",
    name: "The 4 L's",
    description: "Look at the current situation from a factual perspective.",
  },
  {
    id: "quick-retrospective",
    name: "Quick Retrospective",
    description: "Define the team's key focuses of attention.",
  },
];

const SetupRetroView: React.FC = () => {
  const { ws, status } = useSetupRetroWebsocket();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [type, setType] = useState("start-stop-continue");

  const isReady = ws.readyState === ReadyState.OPEN;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    ws.sendJsonMessage({ action: "SetupRetro", data: { name, type } });
  };

  return (
    <AppWrapper>
      <Card>
        <h1 className="w-full pb-2 text-3xl font-light">Setup a Retro</h1>
        <p>
          You are currently logged in as{" "}
          <span className="font-semibold">
            {user.UserAttributes.find((value) => value.Name === "email")?.Value}
          </span>
          .
        </p>
        <p>
          WebSocket Status: <span className="font-semibold">{status}</span>
          {isReady && (
            <span className="ml-4 animate-pulse text-emerald-700">
              Ready to rock.
            </span>
          )}
        </p>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <form className="mt-6" onSubmit={handleSubmit}>
              <Input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                label="Name the Retro"
              />

              <RadioGroup value={type} onChange={setType}>
                <RadioGroup.Label className="sr-only">
                  Retro Format
                </RadioGroup.Label>
                <div className="space-y-2">
                  {RetroFormats.map((format) => (
                    <RadioGroup.Option
                      key={format.id}
                      value={format.id}
                      className={({ active, checked }) =>
                        clsx(
                          "relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none",
                          active &&
                            "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60",
                          checked && "bg-sky-900 bg-opacity-75 text-white"
                        )
                      }
                    >
                      {({ checked }) => (
                        <>
                          <div className="flex items-center w-full">
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={clsx(
                                    "font-medium",
                                    checked ? "text-white" : "text-gray-900"
                                  )}
                                >
                                  {format.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={clsx(
                                    "inline",
                                    checked ? "text-sky-100" : "text-gray-500"
                                  )}
                                >
                                  {format.description}
                                </RadioGroup.Description>
                              </div>
                              <div className="w-6 h-6 text-white">
                                <Transition show={checked}>
                                  <CheckIcon className="w-6 h-6" />
                                </Transition>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <button
                className="px-4 py-2 mt-4 text-white rounded bg-emerald-700"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </Card>
    </AppWrapper>
  );
};

export default SetupRetroView;
