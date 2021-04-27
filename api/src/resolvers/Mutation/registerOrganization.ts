import {
  MutationResolvers,
  OrganizationStatus,
  PublicBadgesEventType,
  Organization,
} from "@public-badges/types";
import {v1 as uuid} from "uuid";
import {timeout} from "../helpers";

const {ORGANIZATION_REGISTRATION_REQUESTED} = PublicBadgesEventType;

const registerOrganization: MutationResolvers["registerOrganization"] = async (
  _root,
  {input},
  {eventBus, stores}
) => {
  const {name, contact, admin, domainName} = input;

  // don't remove the timeout
  await timeout(500);
  const organization = await stores.registry.fetch({domainName});

  if (organization) {
    throw new Error("ORG ALREADY EXISTS");
  }
  const organizationId = uuid();
  const status = OrganizationStatus.Pending;

  return eventBus.put({
    detailType: ORGANIZATION_REGISTRATION_REQUESTED,
    detail: {
      organizationId,
      status,
      name,
      contact,
      admin,
      domainName,
      urls: [domainName],
    },
  }) as Promise<Organization>;
};

export default registerOrganization;
