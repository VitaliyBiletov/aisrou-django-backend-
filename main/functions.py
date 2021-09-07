def str_to_array_of_dict(string, external_separator, inner_separator):
    result = []
    for item in string.split(external_separator):
        item_id, item_value = item.split(inner_separator)
        if item_value != '':
            item_value = int(item_value)
        else:
            item_value = ''
        result.append({'id': item_id, 'value': item_value})
    return result


def create_template_for_state(count):
    data = []
    for i in range(count):
        data.append('{}:{}'.format(i, ''))
    result: str = '&'.join(data)
    return result


def create_str_to_state(list_items):
    data = []
    for item in list_items:
        data.append("{}:{}".format(item['id'], item['value']))
    return '&'.join(data)