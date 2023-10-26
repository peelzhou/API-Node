with COUNTED_TABLE as (
    select b.NAME, count(*) as CUSTOMER_COUNT 
    from CUSTOMER as c
    inner join BROKER as b
    on c.BROKER_ID = b.ID
    group by b.NAME
)

print('test 1 change')

select NAME, CUSTOMER_COUNT
from COUNTED_TABLE
order by CUSTOMER_COUNT desc, NAME
