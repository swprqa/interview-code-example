import { apiRequest } from '@utils/fetch';

const tagsQuery = () => `query {
    tagTypes {
        id, name, tags {id, name}
    }
}`;

export const fetchTags = async () => apiRequest({ query: tagsQuery() });
