import * as M from "./main.style";

import { Container } from "@components/share/commons/commons.style";
import MainEvents from "@components/feature/main/MainEvents";
import HallOfFame from "@components/feature/main/HallOfFame";
import UpcomingEvents from "@components/feature/main/UpcomingEvents";
import NoticeFaq from "@components/feature/main/NoticeFaq";
import YoutubeLink from "@components/feature/main/YoutubeLink";
import Activities from "@components/feature/main/Activities";
import RecommendedProducts from "@components/feature/main/RecommendedProducts";
import InstagramPosts from "@components/feature/main/InstagramPosts";

const Main = () => {
  return (
    <M.Wrapper>
      <MainEvents />
      <Container>
        <M.FlexBox>
          <HallOfFame />
          <UpcomingEvents />
        </M.FlexBox>
        <M.FlexBox>
          <NoticeFaq />
          <YoutubeLink />
        </M.FlexBox>
        <Activities />
        <RecommendedProducts />
        <InstagramPosts />
      </Container>
    </M.Wrapper>
  );
};

export default Main;
