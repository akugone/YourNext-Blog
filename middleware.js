import { chain } from '@/middlewares/chain';
import { middleAuth } from '@/middlewares/middleAuth';

const middlewares = [middleAuth];
export default chain(middlewares);

export const config = { matcher: ['/create-hint', '/profile'] };
