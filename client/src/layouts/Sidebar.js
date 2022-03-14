function Sidebar() {
    return (<div className="col-lg-1 order-2 d-flex flex-lg-column justify-content-center align-items-center" id="sidebar">
        <div className="sidebar__icon--container">
            <i><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAB/UlEQVR4nO3cTU5UQRhG4Sqj7EHABclAN2Ek/mzHjejAHagDZQl2Is0Ah8r8OLCN2N4Ym7ptvbc8T8IEqr98zUlfSBNuKZIkSZK0UMBD4DNwCTzovc++ASfAevNxv/c+vwEu+Gnde599A1bXnu/HuebWuQYB/DK41tlmJ9rX8701xxDNxyBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLmdusA4KSU8mLi80wcHxawKqU8rbW+bpnTfEsh4FMp5V7rnEFc1FqPWwZ4yQozR5DTUspqhjlLtyqlPGodsvi7vo12JzsvWWEMEsYgYQwSxiBhFhcEOACeA++Aq4mvXwFvgWfAQY8d/xvAIXDG3/sA3O2995A2r4xdYvzwHrjTe//hbC5TN/Wk9/7D4fvPjOteAocT546AV1tn3/TYeWjA161v8tEfzh5vnf3yL3dtsZj3fWC396x2PZ9icb/2js4gYQwSxiBhDBLGIGEMEsYgYQwSxiBhDBLGIGEMEsYgYQwSpvn/Q3rZ/nvHKHyFhFlSkHXDY89n22LPlhTkcblZlPPNYyVJkiRJE74B2BCOUPojSmQAAAAASUVORK5CYII="
                className="sidebar__icon" id="fieldPostIcon" alt="field post icon"/></i>
            <p>Picks</p>
        </div>
        <div className="sidebar__icon--container">
            <i><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAE+ElEQVR4nO2cTWgdVRiGny8mYEEsJODC1kWDoOBCIa6qC1MqCBWxLUilEsRKl9aVUBFRF7Z050LciPiHSERFFBWtxapUXBRBsVhQXIiCaOKilpaqebuYSbiZzP2bmTvnzNzvgbu5ufec98zDmfPNuZMBx3Ecx3Eaj6Tp0BmcFElTkj4LncMBJJmkVyQpdBYHkPSkUkJnGXsk3SdpxYVEgKTbJV1QB6EzjS2Stkn6QxlC5xpLJE1L+jErw4UEYLW8zZPhQmqms7x1IRHQWd66kMAoU966kIAoKW8v9pPhQmpAXcpbFxIA9ShvXUjNqE9560JqRAOUty6kRjRAeetCakIDlrcupAY0RHnbDQs9iLYgaRb4GrimTDsT1cQZb5TcnPAhJWWACymNpCngLeCGKtprpBBJM5KuiCCHAS8CO0JnCYakBUnnJC1JWpR0UNKWQFkKl7fdCDGOQkjaLOmNHmP5QdJRSTvT08io85QqbxstRNK8pF+HGFfn7Ll2BHlKl7fdqDprpUialPSUpP9KjrOy2SNpVkPs3g5LtNchkrYBrwPbK256CTgBHAc+MLPfh8g0DZyioooqjyiFSFoAngeuqqG7M8D7JIJOmtm/XTJNAR8z4ooqKiGSNgMvAPcHipA7e9IzycvAwqgDRCNE0h3Aq8B1obOkrACngY+Aq4FH6+g0uBBJk8AT6Sv4xV5oggoZ4cLdWIJtnaQL93e4jHXUPkMiWLijplYhkuZJFu6tdfbbJGo5ZSm94gY+xWX0ZOQzxBfu4ZiQdEjSLZIqny2SDuAL91CYtLbDeA74huQq9TjwrZmtFGnUF+7idArJUkiQL9zl6CUkyzLwBfB5+vq+U1C6+fYM8BgN/Wk4AMvAuqc3DCMkr7FVQWeAZ4FbS8UbL34CdgFnO98sIyR2PgH+Bu4BNgXOkuVLYLeZLWWPf1uF/AbcnA54E3A3ydb5XcBk0GSwCDxoZhcAxkHICnCnmZ3I/kHSDLCXRM5tNecScAw4bGZrx3wchBwxs8f7fUjSjcA+YD9w/YgzXQIeNrPXcnK0WshpYLuZXRrmS5LmSGbNPiq4HTTDMrDHzE526bu1Qs4Dc2Z2tu8nu6Dkbsh5Ejm7Kf+b/s/Arl6Z2izkgJm9VFVjFRQDp4B7zezPPv1owxst4O0hD9ZQKLmX+KCkrwbM86akKwdsex1tmCFrJW4dnal3MSCS3YqnOyupPu21aob8LynYneeS5iQ9p+ROxouSHijQxjqaPkOOmtnh0CGU7ONtNbNfCny3NYt6oRI3NrLHv6m7sueB/U2XkUdThTxS5nojZpp4ynrHzPaGDlEVTV9Dai1x66DJa8gKsNAmGXk0ScixvC31ttGUU1YrStw8mnjKam2Jm0eekPdI9vBj4VBbS9w8NpyyzMxg7WEqO9PXDmCm/ni8a2Z7AvRbG33L3lUhOV+sW1DrStw8CgvJaWiUgrreqNA2NhRV2e3fEg3PKvkRZ1HSX0X301OOlB5pQ8gOvPAMGaCjojOotSVuHiObIQN0PMgM+kfSyJ6SECMbjn9dQnKC5Al6qK7+YyEaIZlQE5JuCtF3aGpbQ5zByB7/JmydjBUuJDJcSGS4kMhwIZHhQiLDhUSGC4kMFxIZLiQyXEhkuJDIcCGR4UIiw4VEhguJDBcSGS4kMjY8nUDSYoggTkJT/h1hbPBTVmS4kMi4DM2qldlqULBcAAAAAElFTkSuQmCC"
                alt="stats icon" id="statsIcon" className="sidebar__icon"/></i>
            <p>Stats</p>
        </div>
        <div className="sidebar__icon--container">
            <i><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAIFUlEQVR4nO2da4xdVRXH/2toC62tVGpbaCsiNIpikPgAxUYhfsAYoxEQNSQajB+MaCgQVNRoAhoI8QNRsNSoMSS+XygSA9IEUjAGqKAlPtGh1Lb2YTt0Oq3ttPPzw77T3Nlz79yZ2Wude5k5v6QfzrnT/15nr7PP3mfvtdeRampqampqampqampqqsW6bUArgJdIWixpoaSDkvZJ2mdmdNWwCuiqQwCT9EZJayRdKOlsSWdJmt/mvzwr6RFJGyX92sy2V2HnjAd4GXArsIXpMwzcDawssOMEYDnwGmA1cIrndfY8wEuB9cDhAkfk7AEunkTZc4BLgJuAB4BdbfQGG79/FlhaRb10BeA9wE5HRzRzALgBeFWLclcBXwG2T1P3VmBuN+osDOB64JhX7XfgT8DlwFxgLemOL+VBYFkVdRXeqQPXSLo9upwWDCiN1CbiiKS9jX/zJC2T9OI2f3tM0h8k3SNpnZntc7KzOkjP7KpaxmTYCdwBXAa8oo3Ny4D3k1pFO/YD15FGiS8MgEWUjaI82Qp8BJgzxWu4roPuPcC8qDp0BfhqdC1PgYeY5t0M3AJsAo600f6+d925AyzGpzP15EOF17QA+CipteV80KvuQqBzU+8GTzpd2ynAk5n2VpyGxn0eIi24LEi3hPOAc0tFzGyvpEslHWo6vUrSu0u1pQCHkCYGL/DWdeIdHiJm1i/pO9npD3hoR7SQNZJOCND1oOMUyxT4Xnb8Ng/RCIeMm77oIV7vqPWExj62TsNh7ivCIa8M0PRiOeDSes1sWNK/stNnlOpGOOS0AE0v5ihNj3ixJzteWCoY4ZAFAZqetJurmg75y2ZxfUY45EUBmp4cc9TK6694bivCISMBmp542pfffAdLBSMcsj9A05MDjlovz463lQrONocckbTbQwhYJKl5DX5EUnHQRYRD8pFHL7HTMZQof9/a0hgKFxHhkHxs3ks846iVTw894SEa4ZB/Bmh68WdHrfOz400eohEO8bwLvdnsqHVRdrzRQ9R9TbixLvC82kcfdpNzzKy4lQDnSHq66dSApKVmdrRU272FNDq2P3rrOrBH0l+ctN6bHR+UdKKHcNQC1eNBuiVsdBxh5bO6KyR90kM4yiF7g3RLcBv9mdm1kj6WnX6fi7aHSDONNYF+9d6c1pCkM81sl4cYsERj37m2mtnppboRLeRK9Z4zpGTTlY56eaCdy5RMhEPy8Xkv8SZHrTXZscs7zpQi+SbJyQGaXhTbBpwoabmkq7OfHi7VlmIc0suTix62Pafxq46HJf3UQTvkkfVUgKYXRcFypNjgVrus7jCzHSXao0S0kMcCNL0ote08ja2zIUl3Svpioe5xIlrIY0pTJ73GgModknfk683sM2Z2uFD3OBFTJ0OSvumt68B6MytdYr0iO36kUK8agFOBHZWEUE+O7cCphdf0ukzzKAHb3EKmTszsP0oByb0whfJfSZc2bCrh09nx/V5v/ZUBrACer7o5NLEfWOFwHecDI5n25R51VDmkbV/d4lcO9r8LeCbT3YRTSGpO1GxvM7+toIx2POCgcadSuo9RkLTWzDwD7qqD1MG3258XyTAFaTea7O/PdD/nUS/tCG8hjc7059HltOA+MysOXNP4JYqfOGi2pYpHliR9vaJymvlGkG5orEAlDjGzRyX9soqyGjxkZh79h5T6jGZOctJtSVUtRErj+CMVlDMi6QZHvaHseGY4xMz+LumaCoq62cxcoggb5CuBM8MhkmRmdyklb4lik6SbnDUHs+PQJGeVOqTBlkDtrWbmvT8lDx6/EQiLGeiGQyIz6EQkycxHiOdKug9YHlDWjHOI++4tM/udpJ9lp98uaTPwcZyzzXXDIRGrlNFcpfHR7UslrZPUD3wep/yM3XBI8dbhCQh5tpvZoKRLJN3f4ueVkr4s6Tngu8CbI2wIg9jZX5ctARPYbqQ8jvs62PEU8AnAcwt2DMDjgQ75BxWk3SOlu71tEo4ZBG4HijM8hABcEeiMUfIg6MjrWQhcDfytg03DwF1A72S5AN4JHIz1BZCSNFearwvoa1zfLxqV344DpEdeN/ru48bOJ+UtPBrsiGZGSI+KyAFEu+tdCXwJ2DaBfQ9TdWsBTiJ1bM9G1/4EbAeuJfDNeoLrnwdcRerXWtEPvLoKQ5aQ0n5PdIdUzS7gCwS9XXeoj7nAp4CBFnbtBs6MKvhC0tcKDlVVy9PgMPAj4CIqToJM+iLEhhY2PU3KCuFSyGKS9zdXVaOO/JWUPXWJS2VMrr7mAN9qYcu6UuGzScO4oerqL4z/Ad8mbXUOh/Ry+cPMhuFplQ+8AbiX3srn7sUI8BsqmPogpWHPP58x+eAJ4CzgB4yP3puJjAA/BlYH+kSkEWgzh4CTJ+zYSC8w10u6WU4b419ADCutPt4SERRH6sh3aOyE6IfbvjECp0t6UNJtmn3OkKS5SjfiBmCVt3hjBnlDdvrili0EuEDSvRqfsWC2MqCYLEcrJTVvk3h0nEOAtyrN+/fiXvOZzu4xDiF9VOv36vypoJogjjsEmK+0B++13TOnpnl9+0bVzpgsd0v6WoSwSWnKWKnTmo2jqekwKGl1xJa20WHvWtXOmAqL5JQfK8dI2Qm2yTdJ/Wzg35LO8H5p7FMK+qqdMXVWSXKf9xp1SM30yDOTFtMn3xxSs423eAv2aewO05qp4R5vZcCQev8jLL3KATPzWX5tYEBECP9sYoGZHer8Z5OjewFbM4deTmlYU1NTU1NTU1MjSfo/n/6RpmL4y6QAAAAASUVORK5CYII="
                alt="group icon" id="groupIcon" className="sidebar__icon"/></i>
            <p>Groups</p>
        </div>
    </div>)
}

export default Sidebar;