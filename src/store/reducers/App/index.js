import controllers from "../../../controllers";

const DATA_INITIAL_APP = {
    dark: false,
    icon_music: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAi0AAAIACAMAAAB5BayoAAAAw1BMVEXDw8PvBQXwDg7vCgrvBwfwFBT+7Oz929v//PzwGRn+5+fxHR36tLT1aGjxISH/+vr+9fXvBgb//v7+8PD94+P7urr8ysr3enr1YWH+9/f7wcH0T0/yNzf+8vL819f7vr7zRETzPz/zOjrxJib5nJz3gID2bW30TEz4l5f2dHTzSEjyLCz94OD6sbH5p6f2cXH0VlbyNDT81NT80ND4jo74ior3fHzyMTH5oaH3hIT1XFz6q6v4kpL7xcX6trb5pKT3iYmtoHaXAAAL9ElEQVR42uzd62pTQRSG4fU1rVVjorUeWhWLGg1Wq+ABFHr/1+WvlpgTk5iAMM9zDS8ke89aswsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgf3HxfnqQwXA0eVKw1vHX3JqcF6w0yZzXBUudn2XewZeCJR5dZtHJj4JF0yx1XTDvKit4NmLe6TArvCz42/Os9LRg1nXWeFYw423W+FAwI+uMC1prSYFaUAt7lrUeF7TW8r2gtZbx3YLGWvKioLWWUUFrLQf3CxpryVHBTC1eubCrWu4UzNbiHJrd1JLLgtZaclXQWsvwtKCxlhwWtNYSe9G01/KxoLWWw4uCqrQ5K7ipxQEAO6zluCCNXj0supdWJw+K3qXZvaJ3aWeiu3tp97voXDYwNhnVuWxianexb9nIz6JnuWV2gd3WkjeGF3qWG44XaanFXxe2r8UiPTur5cilLt3K5oafiz5lORejskS28ck9HX3KVt4ZpetStjP8VvQnK7gFiEXZ1sAyfX+ytcGvojOZZ/SSvdQydVVHZ7KEPQD2UUt8ZLwr+UcjO4wdSRK/Rvxh7053ogiiMAyft2c0dhDCIksiGmBEXH4oiQS3eP+X5T9QwW6W7urvVH/PLdRJz1SdrVS0sO+70VwwgCMnGWeCIayFzQLDOHRSeg4YSBNWP4by2U3S9WMwGx58WT3+z80jNma0bK1vhlWMYX0MqxgD23feqGIMbuFEQLUY3olf6mrFCJoLf17qxAN4F+NcMZIPL8KqQx+3p9kVRnPmr0t1GJOrpCrDmFrvHakL4zp4FVYPRrYKqwe38dOu3YrxNd4lUQsKOPPdqBKUsOYizDrQzw1qVjZaaHfD0qOU5WlYdvRwHsCuUdDiS1hqFOUGktwo6txVDKlRVut2xswo7ZPzAHlR3HevfU2L8o49uyMrpuAahqSYQrsXlhGTaJyUTon78pi6GWMiC7cDJMQdOVwsgrtyuFhwD/7vMndMqPW7SzJMaeUCqVyY1GVYJkzLEzBTYWLvwvJgYgvnABLhcbyWcVaY3NuwLJied0qnwfSa12E5IODclbpJoGAZlgIS3MOYAxLeh2WAhKVbGFNAxLcwfYhwaVQGqAjTh4pfYfKQ8TNMHTJaL5CQhw5fi+Shw7v15CHEQ+nUIcTv/+oQ8mQnTBpKNtwwog0pLrrUhpTzMGVocXeRNLRshQlDTJgwxDwL04UYL9RThpjGY92FocYjOoSh5jBMFnI8ulAXco7DVCHHTdG60BOmCj1hqtDzI0wUeg7CRKFnI0wUgr6GaUKQf4pUIWgVpglFbkMThSKP5xaFIqeKRKHIY8VEISlMEp123lzyOI6WmvSe2npDL0fLTPSf2tPTlh6Olpm4y6ltrijKc/9V0SmuHFGO26FV0Smu7Z5QivOKqugUfzqkEI+3VEWn+NvmBWW8DFNEp/jX+pISLsMU0Slu2DtmdB6dq4pOcdN2y/iW22GC6BS3es7ofrN3Z1tNBFEUhvfOYCSEYIJJcMYoMqqIEhRUfP+n8sJxaXJ6SB89VWt/D8DN+Rfp6q6u1kkLIdGE5WYdOjuFBEQTVpg+o69zSEA0YZWdK7qaQgKiCav15nQ0gAREEwzbC5ahWjJCE0xdOtFhhUHRBFPvkiXoIXQ+aEKBcYeFdJWbD5pQZNCli7eQgGhCofMhPTyGBEQTivUvadO93HzQhDIO2LiOjvsPiSaUsX3Fpm1AIqIJpYyP2LATSEQ0oaR9NusMEhFNKGvBRm1BIqIJpc24nPb854SmBv6Q3ifKCE0ob/sBl9JmqIzQhAruPGRjdiAR0YQq+kM2Q2csRNXk1B6rlsw1OrWPqiVvzU5tS7Vkrdmp3Zurlpw1PLW7qiVnTU9twQbMISHRhMq2n7IuPSYKjyZUd3eDa3sHCYkm1ME16RsiYdGEOoasRTvn4qMJdUxGXM8BJCaaUMsu17MPiYkm1HPDH3TZkhWaUNMxv9FlS15oQk09VqXDclNAE+riGr5AgqIJdb1nVfqASAJoQl3jOUvTI8VkeA3uvmrJkNvgjlVLfvwGR5O2K6SI9Kqlw3pmkKjoVssZK9BxlkmgWy1vR6yjrQV0XH61YMrVtBMqSY61YI9l6XzCNHjW8pLVDSFxedYCVvcZEpdrLS2uoIdEaXKt5QWX0o3cVLnObqpa8uI7u0MupZ1QifKtZafFEnTgXCp8a8EVK2nry76hOdcy0A9RTpxrwRYr6Gr9HJt3LRNWsAsJzbuW2/xJmxWS510LWN6mvkoUnHstLZbWg8TmXssD/kb3cdPmPr/nqiUf7vPrj1hSFxKcey04YjkjXbaE51/LQPdxs+Ffy6M2SWrXXA78a8GCpPb6Z4EmOP8U6QNWaaF/Lbeo5XMm/sUIWUIbEl+QWkZ66SwFQWrRx+WTEKOW0RSSAPrXcqo7c7nwr+VQC6JsuE/xtMVCI0gS3GvZ0zVuPiLstOxo+ZwI51oenbBQS98MSYVvLeMz6hDLjPjW8oHFNvU8MRmutXRZgl4LSQf/+0likGR4TvIztXrOi2ctD1lsU2dwJMSxlhd6Tz43jrUMWUz/WZLiV0tPl7jZ8RvmNYvtQVLiV8trvRWSHZp8zxB7qhtzifGr5YXOa8mOXy0LXeJmx2+e92nrnkISQ5Pn2/LXkNTQ5LjHcguSHJr8Nvtf6iDlBDnWgiPt8s8MTW6HKywgCfo/u6EOdF8uSa617JxwKa2dE+VaC+4+4xIbkDT51oL+G/5leA5Jk3MtuMM/HfchiaIJDbjzhb9saDGUMprQiJe7m99bub4HiWDc/zR4dXGxP5vtXzy/ub7/+FGYWgBMbj4+n2gpFMDtyeHRfNjmn072dmdPbsWoRb6ydydYTQRhFIXfy0QMAgoSQBLmGSEyKIgHZf+rcgceoiR9q/t9a7inu6r6P9WVG0xGHb/GaPKzl1qabLC56Cl0zq/GqaWhjh8+elqtx15qaZzV5/Nl/5PO3qfU0iSPB/5P3bvU0gwL534Do7PUUn/PXzt+G5NBaqm3/pXfTmuSWmps3W+tszRILbW0s+0ZaI1TSw312p6JxaO+/yK1lOd23zOUWmplpe1XSy0NtzPy66WWZrtveQqppcmGh55Kammws7ank1qaq+/KKQqxtu3KKYqws2wARRHemUBRgmcjKAow7BpBwQdpJbWUYGAKBd3ajSkUcBvmUMB9NIeC7dYgCrQtzqIltdC9J72HUgvbGuLrUGopw5JZFGAdsyi4zgyjwBovGkaBRTrFTS1wvZZpFFSYOYXUUgDzKKBWzKOAujaPgmnBQAqmYwMpmC4NpEBCPlpSC9TIRAok2tfn1EJmJAWSkRREYyMpiD4bSUF0ZCQF0amRFESHRlIQ8cbmUgsWdEuUWpCGZlIAQTfQqQXpl5kUQFdmUgC9N5MCaNdMCiDI1duppQicG3JTC1+/8v9WpZaC4O7iSC1gB0ZSEL2Y6EJBxDyemyiIvpjoSIFkolsFkoGybKEy0IuCiXjgcqdg2jTO4qqCacyb415XUD2ZZkVBxRuIUnB9N8tIwfXJLL8VYEZ5t6UAM8qxggw1yp1Y6PaM0e0p2Iac3/v+UNBxTug+KPAMsa/gg1z2395R8A0ZV3Jn1VKGEwM85HtiIW4BkwuKUty7aqeKUqy6Yss5mCvIgyvVyjRuUdbbrkwWLcW5dnWeFIVxZS6yeS7O6okrMcoCt0QV5ZJYytR3BQ4UZfrmudsbK0p13fJc9RUFG3qO2meKot14brq7irJtLXleFhTlu/QcdK8VdbC10fGs7efBUhvrnrFWNkM18qede9lJGIqiAHqPbSUGCBpMwOIAAsEHKjQ+Bor//1tOHTjQ2k7atb7hDE6yd/Y+jzatNLa7ZfISLcnHic7ZZ9GGpeZTJz3fRPN2iY5aRMPWG+9tl82zaEpl+anzBtsimpCViR64quLfhrOHRF+MDidR12qjH9c356Nh1JCtjokempRvefzNejxN9NXpxzb//am8iw5JaVreLnZZ/OxiOX69TPDd5PPxODvcXw+LIiIrztbVYn73VA4sJAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANT2BTXn88CefdjIAAAAAElFTkSuQmCC",
    localListMusic: [],
    widthItems: 0
};

const App = (state = DATA_INITIAL_APP, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, dark: !state.dark };
        break;
        case "ADD_FAVORITE":
            let localListMusic = controllers.AppController.addFavorite(state.localListMusic, action.payload.musicId);
            return { ...state, localListMusic: localListMusic };
        break;
        case "SHARE_FILE":
            controllers.AppController.shareFile(action.payload.items);
            return state;
        break;
        case "DELETE_FILE":
            return { ...state, localListMusic: action.payload.localListMusic };
        break;
        case "GET_MUSICS":
            return { ...state, localListMusic: action.payload.localListMusic, 
                widthItems: action.payload.widthItems };
        break;
        default: return state;
        break;
    }
}

export default App; 