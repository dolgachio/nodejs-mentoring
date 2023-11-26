import { DefaultDTO, DefaultDTOLinks } from "../models/DefaultDTO";

export function addLinksToResponseData(DTO: DefaultDTO<unknown>, links: [string, string][]): DefaultDTO<unknown> {
    if (links.length === 0) {
        return DTO;
    }
    
    DTO._links = links.reduce<DefaultDTOLinks>((resultLinks, linkData) => {
        const [action, href] = linkData;

        resultLinks[action] = { href };

        return resultLinks;
    }, {});
    
    return DTO;
};